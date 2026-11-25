# Test Plan – E-Commerce Web Application

## 1. Objective
Verify that the core shopping flows (authentication, browsing, cart, checkout) work correctly and regress-safely, using automated Cypress E2E tests.

## 2. Scope
**In scope:** login/logout, access control, product listing & sorting, product details, cart operations, checkout form validation, order totals, order completion.
**Out of scope:** real payment gateways, performance/load testing, security penetration testing, native mobile apps.

## 3. Application Under Test
SauceDemo – https://www.saucedemo.com (public demo store). Base URL is configurable via `CYPRESS_BASE_URL`.

## 4. Approach
- Tool: Cypress 13 (JavaScript)
- Design pattern: Page Object Model + custom commands + fixtures (data-driven)
- Session caching with `cy.session()` for fast, isolated tests
- Retries in CI (2) to reduce flakiness; screenshots/videos on failure
- Cross-browser (Chrome, Firefox) via GitHub Actions; mobile viewport via `npm run test:mobile`

## 5. Test Case Matrix
| ID | Area | Scenario | Type | Priority |
|----|------|----------|------|----------|
| TC-AUTH-01 | Auth | Valid login | Positive | High |
| TC-AUTH-02 | Auth | Locked-out user rejected | Negative | High |
| TC-AUTH-03 | Auth | Wrong password rejected | Negative | High |
| TC-AUTH-04 | Auth | Username required | Negative | Medium |
| TC-AUTH-05 | Auth | Password required | Negative | Medium |
| TC-AUTH-06 | Auth | Logout | Positive | Medium |
| TC-AUTH-07 | Auth | Protected page blocked when logged out | Security | High |
| TC-CAT-01 | Catalog | All products render with image & price | Positive | High |
| TC-CAT-02..05 | Catalog | Sort A–Z, Z–A, price asc/desc | Positive | Medium |
| TC-CAT-06 | Catalog | Product detail navigation | Positive | Medium |
| TC-CAT-07 | Catalog | Prices match expected data | Data | High |
| TC-CART-01 | Cart | Empty on fresh session | Positive | Medium |
| TC-CART-02..03 | Cart | Add single / multiple items, badge count | Positive | High |
| TC-CART-04..05 | Cart | Remove from catalog / cart page | Positive | High |
| TC-CART-06 | Cart | Persistence across navigation | Positive | Medium |
| TC-CART-07 | Cart | Continue shopping | Positive | Low |
| TC-CART-08 | Cart | Correct name & price in cart | Data | High |
| TC-CHK-01..03 | Checkout | Required-field validation | Negative | High |
| TC-CHK-04 | Checkout | Cancel returns to cart | Positive | Medium |
| TC-CHK-05 | Checkout | Subtotal + tax = total | Calculation | High |
| TC-CHK-06 | Checkout | Complete order | Positive | Critical |
| TC-CHK-07 | Checkout | Cart cleared after order | Positive | High |
| TC-E2E-01 | Journey | Login → sort → add → checkout → logout | E2E | Critical |

## 6. Entry / Exit Criteria
- **Entry:** build deployed to test environment, test accounts available.
- **Exit:** 100% of Critical/High tests pass; no open Critical/High defects.

## 7. Risks & Mitigation
| Risk | Mitigation |
|------|------------|
| Selector changes break tests | Use `data-test` attributes + page objects (single place to fix) |
| Flaky network/timing | Cypress auto-retry, CI retries, no fixed `cy.wait()` |
| Demo site changes/outage | Configurable base URL; fixtures hold expected data |

## 8. Reporting
JUnit XML in `cypress/results`, screenshots & videos as CI artifacts.
