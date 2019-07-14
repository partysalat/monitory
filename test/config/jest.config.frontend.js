// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  coverageDirectory: 'target/reports/coverage-frontend',
  setupFilesAfterEnv: [`${__dirname}/enzymeSetup.js`],
  coveragePathIgnorePatterns: [
    '/node_modules/',
  ],
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  coverageReporters: [
    // "json",
    'text',
    // "lcov",
    // "clover"
  ],
  rootDir: `${__dirname}/../../lib/frontend`,

};
