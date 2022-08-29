// jest.config.js
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverageFrom:  ['<rootDir>/src/**/*.ts', '!**/node_modules/**'],
  coverageDirectory: 'coverage',
}