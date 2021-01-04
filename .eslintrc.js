/* eslint-env node */
module.exports = {
  extends: ["eslint:recommended", "plugin:react/recommended"],
  globals: {

  },
  plugins: [
    "import",
    "react-hooks",
    "sort-imports-es6-autofix",
    "react",
    "sort-keys-fix",
  ],
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "react/prop-types": "off",
    "no-unused-vars": "off",
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    "react/jsx-sort-props": "error", // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-sort-props.md
    "sort-keys-fix/sort-keys-fix": "error", // https://github.com/leo-buneev/eslint-plugin-sort-keys-fix#readme
    "sort-imports-es6-autofix/sort-imports-es6": [
      2,
      {
        "ignoreCase": true,
        "ignoreMemberSort": false,
        "memberSyntaxSortOrder": [
          "none",
          "all",
          "multiple",
          "single"
        ]
      }
    ]
  },
  settings: {
    react: {
      version: "latest",
    }
  },
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
    jest: true,
  }
};
