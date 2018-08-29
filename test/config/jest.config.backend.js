// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  coverageDirectory: 'target/reports/coverage-backend',
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
    'text',
  ],

  rootDir: `${__dirname}/../../lib/backend`,
  testEnvironment: 'node',
};
