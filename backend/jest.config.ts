import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  testMatch: ["**/tests/**/*.test.ts"],
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: "./tsconfig.test.json",
      },
    ],
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  }
};

export default config;
