// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  coverageDirectory: `${__dirname}/../../target/reports/coverage-backend`,
  coveragePathIgnorePatterns: [
    '/node_modules/',
  ],
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/webpack.config.js',
    '!**/vendor/**',
  ],
  coverageReporters: [
    'json',
    'text',
    'lcov',
    'clover',
  ],

  rootDir: `${__dirname}/../../lib/backend`,
  testEnvironment: 'node',
};
