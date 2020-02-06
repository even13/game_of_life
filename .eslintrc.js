module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'eslint-config-airbnb',
    'plugin:jest/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'jest',
  ],
  rules: {
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "jest/valid-expect": "error",
    "react/jsx-props-no-spreading": "off",
    "no-plusplus": "off",
    "max-len": ["error", { "code": 150 }]
  },
};
