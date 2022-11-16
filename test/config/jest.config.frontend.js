// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
module.exports = {
  clearMocks: true,
  coverageDirectory: `${__dirname}/../../target/reports/coverage-frontend`,
  coveragePathIgnorePatterns: ['/node_modules/'],
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  transform: {
    '^.+\\.tsx?$': 'esbuild-jest',
  },
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  rootDir: `${__dirname}/../../lib/frontend`,
};
