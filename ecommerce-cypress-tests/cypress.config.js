const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'syuh5u',
  e2e: {
    // Change this (or set CYPRESS_BASE_URL) to point the suite at another store
    baseUrl: process.env.CYPRESS_BASE_URL || "https://www.saucedemo.com",
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
    viewportWidth: 1280,
    viewportHeight: 800,
    defaultCommandTimeout: 8000,
    video: true,
    screenshotOnRunFailure: true,
    retries: { runMode: 2, openMode: 0 },
    reporter: "junit",
    reporterOptions: {
      mochaFile: "cypress/results/junit-[hash].xml",
      toConsole: false,
    },
  },
});
