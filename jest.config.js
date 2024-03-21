module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  setupFilesAfterEnv: ["./tests/jest.setup.ts"],
  prettierPath: require.resolve("prettier-2"),
  modulePathIgnorePatterns: ["scripts"],
};
