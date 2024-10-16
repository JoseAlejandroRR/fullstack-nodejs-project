
const config = {
  roots: ['<rootDir>/src', '<rootDir>/src/__tests__'],
  "reporters": ["default"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  testPathIgnorePatterns: [
    "/node_modules/",
  ],

  collectCoverage: true,
  coverageDirectory: './_reporting/coverage',
  testTimeout: 1000 * 30,
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/src/__tests__/mocks/'],
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/src/__tests__/mocks/'],
};

module.exports = config;