module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
    tsconfigRootDir: "./",
  },
  plugins: ["@typescript-eslint/eslint-plugin", "prettier", "react-hooks"],
  extends: [
    "@react-native",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier",
    "react-hooks",
    "plugin:react-hooks/recommended",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    quotes: ["warn", "double", { avoidEscape: true }],
    "no-nested-ternary": "warn",
    "no-var": "warn", // Requires let or const instead of var
    "no-console": "warn",
    "prettier/prettier": "error",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
};
