
const config = {
  roots: ['<rootDir>/src', '<rootDir>/test'],
  "reporters": ["default"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  testPathIgnorePatterns: [
    "/node_modules/",
    "/test/utils/",
    "/test/starterSetup.ts"
  ],

  collectCoverage: true,
  coverageDirectory: './_reporting/coverage',
  testTimeout: 1000 * 30,
};

module.exports = config;