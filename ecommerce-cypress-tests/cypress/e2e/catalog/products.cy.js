import InventoryPage from "../../support/pages/InventoryPage";

const texts = ($els) => [...$els].map((e) => e.innerText);
const nums = ($els) => texts($els).map((t) => parseFloat(t.replace("$", "")));

describe("Product catalog", () => {
  beforeEach(() => {
    cy.loginAs("standard");
    InventoryPage.visit();
  });

  it("TC-CAT-01: displays all products with image and price", () => {
    cy.fixture("products").then((products) => {
      InventoryPage.items().should("have.length", products.length);
      InventoryPage.items().each(($item) => {
        cy.wrap($item).find("img").should("be.visible");
        cy.wrap($item)
          .find('[data-test="inventory-item-price"]')
          .invoke("text")
          .should("match", /^\$\d+\.\d{2}$/);
      });
    });
  });

  it("TC-CAT-02: sorts by name A to Z", () => {
    InventoryPage.sortBy("az");
    InventoryPage.names().then(($els) => {
      const n = texts($els);
      expect(n).to.deep.equal([...n].sort());
    });
  });

  it("TC-CAT-03: sorts by name Z to A", () => {
    InventoryPage.sortBy("za");
    InventoryPage.names().then(($els) => {
      const n = texts($els);
      expect(n).to.deep.equal([...n].sort().reverse());
    });
  });

  it("TC-CAT-04: sorts by price low to high", () => {
    InventoryPage.sortBy("lohi");
    InventoryPage.prices().then(($els) => {
      const p = nums($els);
      expect(p).to.deep.equal([...p].sort((a, b) => a - b));
    });
  });

  it("TC-CAT-05: sorts by price high to low", () => {
    InventoryPage.sortBy("hilo");
    InventoryPage.prices().then(($els) => {
      const p = nums($els);
      expect(p).to.deep.equal([...p].sort((a, b) => b - a));
    });
  });

  it("TC-CAT-06: opens product details and returns to the catalog", () => {
    cy.fixture("products").then(([first]) => {
      InventoryPage.names().contains(first.name).click();
      cy.url().should("include", "/inventory-item.html");
      cy.get('[data-test="inventory-item-name"]').should("have.text", first.name);
      cy.get('[data-test="inventory-item-price"]').should("have.text", `$${first.price}`);
      cy.get('[data-test="back-to-products"]').click();
      cy.url().should("include", "/inventory.html");
    });
  });

  it("TC-CAT-07: displayed prices match expected catalog data", () => {
    cy.fixture("products").then((products) => {
      products.forEach((p) => {
        cy.contains('[data-test="inventory-item"]', p.name)
          .find('[data-test="inventory-item-price"]')
          .should("have.text", `$${p.price}`);
      });
    });
  });
});
