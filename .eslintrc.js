module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  plugins: ["prettier"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-essential",
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/typescript",
    "prettier",
    "plugin:prettier/recommended",
    "prettier/vue",
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  rules: {
    quotes: ["warn", "double"],
  },
};
