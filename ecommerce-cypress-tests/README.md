# E-Commerce Test Automation with Cypress

End-to-end test automation framework for an e-commerce web app, using **Cypress**, the **Page Object Model**, fixtures, and CI via GitHub Actions.
Default target: [SauceDemo](https://www.saucedemo.com) (public demo store). 30 automated tests cover login, catalog, cart, checkout, and a full purchase journey.

## Project structure
```
cypress/
  e2e/
    auth/       login.cy.js            # authentication & access control
    catalog/    products.cy.js         # listing, sorting, details
    cart/       cart.cy.js             # add/remove/persist
    checkout/   checkout.cy.js         # validation, totals, order completion
    journey/    purchase-journey.cy.js # full E2E flow
  fixtures/     users.json, products.json, checkout.json
  support/
    commands.js                        # cy.loginAs(), cy.addToCart()
    pages/                             # Page Objects
docs/TEST_PLAN.md                      # test strategy & case matrix
.github/workflows/cypress.yml          # CI (Chrome + Firefox, nightly)
cypress.config.js
```

## Getting started
Prerequisite: Node.js 18+
```bash
npm install
npm run cy:open     # interactive runner
npm run cy:run      # headless, all tests
```

## Useful scripts
| Command | Purpose |
|---|---|
| `npm run test:smoke` | Auth + E2E journey only |
| `npm run test:auth / catalog / cart / checkout` | Run a single suite |
| `npm run test:chrome` | Headless in Chrome |
| `npm run test:mobile` | iPhone-sized viewport |

## Pointing at a different store
```bash
CYPRESS_BASE_URL=https://your-store.example npm run cy:run
```
Then update:
1. Selectors inside `cypress/support/pages/*.js` (only place selectors live)
2. `cypress/fixtures/*.json` (users, products, prices)
3. URL assertions (e.g. `/inventory.html`) in specs

## Key design decisions
- **Page Objects** keep selectors in one place → one fix when UI changes.
- **`cy.session()`** logs in once per user, making tests fast and independent.
- **Fixtures** keep test data out of test logic.
- **`data-test` selectors** are stable against styling changes.
- **Retries + artifacts** (screenshots, videos, JUnit XML) for reliable CI debugging.

## Ideas to extend
- API-level tests with `cy.request()` · visual regression (`cypress-image-snapshot`)
- Accessibility checks (`cypress-axe`) · Mochawesome HTML reports
- Tests for `problem_user` / `performance_glitch_user` to find known defects
