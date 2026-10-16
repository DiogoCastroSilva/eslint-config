# @diogozx-org/eslint-config

[![npm version](https://img.shields.io/npm/v/%40diogozx-org%2Feslint-config)](https://www.npmjs.com/package/@diogozx-org/eslint-config)
[![CI](https://github.com/DiogoCastroSilva/frontend-tooling/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/DiogoCastroSilva/frontend-tooling/actions/workflows/ci.yml)

Reusable ESLint flat configs for TypeScript, React, Next.js, and Storybook. The base config includes Prettier formatting checks.

## Requirements

- Node.js 20.19+, 22.13+, or 24+
- ESLint 9 or 10
- TypeScript 5.3+
- Prettier 3

## Install

```sh
npm install --save-dev @diogozx-org/eslint-config eslint prettier typescript
```

## Base TypeScript config

Create `eslint.config.mjs` in your project root:

```js
import config from "@diogozx-org/eslint-config";

export default config;
```

This enables recommended TypeScript ESLint rules and reports Prettier formatting violations as ESLint errors. The package supplies the TypeScript ESLint and Prettier integrations.

## Next.js preset

Install `eslint-config-next` using a version compatible with your app:

```sh
npm install --save-dev @diogozx-org/eslint-config eslint-config-next eslint prettier typescript
```

Then configure `eslint.config.mjs`:

```js
import nextConfig from "@diogozx-org/eslint-config/next";

export default nextConfig;
```

The preset includes global ignores for `.next/**`, `out/**`, `build/**`, and `next-env.d.ts`. It expects `eslint-config-next` to be installed in the consuming app and does not pin or install Next.js for you.

## React preset

Use this for React packages that do not use the Next.js preset:

```sh
npm install --save-dev @diogozx-org/eslint-config eslint prettier typescript
```

```js
import reactConfig from "@diogozx-org/eslint-config/react";

export default reactConfig;
```

The preset includes the recommended React Hooks rules and JSX accessibility rules. Keep framework-specific configuration, aliases, and generated-file ignores in the consuming project.

## Storybook preset

Install `eslint-plugin-storybook` alongside the shared config:

```sh
npm install --save-dev @diogozx-org/eslint-config eslint-plugin-storybook eslint prettier typescript
```

```js
import storybookConfig from "@diogozx-org/eslint-config/storybook";

export default storybookConfig;
```

The Storybook plugin is an optional peer dependency, so projects that do not use Storybook do not need to install it.

## Development

From the repository root, install all workspace dependencies and run every package's tests:

```sh
npm install --package-lock=false
npm test
```

To run only this package's tests:

```sh
npm run test:eslint
```

## Versioning and publishing

This package is versioned and published independently from the other workspaces. Update this package's `version` in `packages/eslint-config/package.json` for a release. Merging changes under `packages/eslint-config/` to `main` triggers the ESLint package publishing workflow. The workflow uses npm Trusted Publishing (OIDC); the npm package must trust GitHub owner `DiogoCastroSilva`, repository `frontend-tooling`, and workflow `publish.yml`, with no GitHub environment configured.

## License

MIT
