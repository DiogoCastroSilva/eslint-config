# @diogocastrosilva/eslint-config

[![npm version](https://img.shields.io/npm/v/%40diogocastrosilva%2Feslint-config)](https://www.npmjs.com/package/@diogocastrosilva/eslint-config)

A shareable ESLint **flat config** for TypeScript projects, with Prettier formatting checks.

## Requirements

- Node.js 20.19+, 22.13+, or 24+
- ESLint 9 or 10
- TypeScript 5.3+
- Prettier 3

## Install

Install the config and its peer requirements in your project:

```sh
npm install --save-dev @diogocastrosilva/eslint-config eslint prettier typescript
```

The config package supplies the TypeScript ESLint integration and Prettier ESLint integration. You do not need to install those plugins separately.

## Configure

Create `eslint.config.js` in your project root:

```js
import config from "@diogocastrosilva/eslint-config";

export default config;
```

This package uses ESLint's native flat-config format. It is intended for ESLint 9 and 10; it does not provide a legacy `.eslintrc` configuration.

## What it enables

- The recommended TypeScript ESLint rules
- Prettier formatting violations reported as ESLint errors
- No requirement for explicit function return types
- No requirement for explicit member accessibility modifiers

Run ESLint as usual:

```sh
npx eslint .
```

## Development

```sh
npm install --package-lock=false
npm test
```

## License

MIT
