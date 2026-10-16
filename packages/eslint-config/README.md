# @diogozx-org/eslint-config

[![npm version](https://img.shields.io/npm/v/%40diogozx-org%2Feslint-config)](https://www.npmjs.com/package/@diogozx-org/eslint-config)
[![CI](https://github.com/DiogoCastroSilva/frontend-tooling/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/DiogoCastroSilva/frontend-tooling/actions/workflows/ci.yml)

Reusable ESLint flat configs for TypeScript, React, Next.js, and Storybook. The base config includes Prettier formatting checks. An opt-in type-checked preset adds type-aware rules that catch unsafe `any` flows and floating promises.

## Requirements

- Node.js 20.19+, 22.13+, or 24+
- ESLint 9 or 10
- TypeScript 5.3+
- Prettier 3

## Install

```sh
npm install --save-dev @diogozx-org/eslint-config eslint prettier typescript
```

## Presets

| Export | Purpose |
| --- | --- |
| `@diogozx-org/eslint-config` | Base: TypeScript ESLint **recommended** rules + Prettier |
| `@diogozx-org/eslint-config/base` | Core TypeScript rules without Prettier (for composition) |
| `@diogozx-org/eslint-config/react` | Base + React Hooks + JSX accessibility |
| `@diogozx-org/eslint-config/next` | Base + Next.js core-web-vitals + TypeScript presets |
| `@diogozx-org/eslint-config/storybook` | Base + Storybook recommended (optional peer dep) |
| `@diogozx-org/eslint-config/type-checked` | Base + **type-aware** rules (requires a `tsconfig.json`) |

## Base TypeScript config

Create `eslint.config.mjs` in your project root:

```js
import config from "@diogozx-org/eslint-config";

export default config;
```

This enables recommended TypeScript ESLint rules and reports Prettier formatting violations as ESLint errors. The package supplies the TypeScript ESLint and Prettier integrations.

## Type-checked config (opt-in)

For projects with a `tsconfig.json`, the type-checked preset adds type-aware rules that catch runtime defects the base config cannot:

```sh
npm install --save-dev @diogozx-org/eslint-config eslint prettier typescript
```

```js
import typeCheckedConfig from "@diogozx-org/eslint-config/type-checked";

export default typeCheckedConfig;
```

This extends the base config with `typescript-eslint`'s `recommendedTypeChecked` rules, including:

| Rule | Catches |
| --- | --- |
| `no-unsafe-assignment` | Assigning an `any` value to a typed variable |
| `no-unsafe-member-access` | Accessing members on an `any` value |
| `no-unsafe-argument` | Passing an `any` value as a function argument |
| `no-unsafe-return` | Returning an `any` value from a typed function |
| `no-unsafe-call` | Calling an `any` value as a function |
| `no-floating-promises` | Unawaited promises returned from async functions |
| `no-misused-promises` | Promises used in non-Promise contexts (e.g. `if`) |
| `no-unnecessary-type-assertion` | Type assertions that don't change the type |

The preset sets `parserOptions.project: true`, which auto-discovers the nearest `tsconfig.json`. **Type-aware linting is slower** because the TypeScript type checker must load the project — this is a deliberate opt-in trade-off. Use it on application code and component libraries; omit it for tooling config or build scripts.

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

## Rules overview

All rules in the base config are **errors** (the workflow fails CI). The React preset adds React Hooks rules (errors for `rules-of-hooks`, warnings for `exhaustive-deps`) and JSX accessibility rules (errors). Prettier violations are reported as errors.

Key rules enforced:

| Category | Rule | Severity |
| --- | --- | --- |
| TypeScript | `@typescript-eslint/no-explicit-any` | error |
| TypeScript | `@typescript-eslint/no-unused-vars` | error |
| TypeScript | `@typescript-eslint/no-non-null-assertion` | error |
| TypeScript | `@typescript-eslint/no-require-imports` | error |
| TS (opt-in) | `@typescript-eslint/no-unsafe-assignment` | error |
| TS (opt-in) | `@typescript-eslint/no-floating-promises` | error |
| React | `react-hooks/rules-of-hooks` | error |
| React | `react-hooks/exhaustive-deps` | warn |
| Accessibility | `jsx-a11y/alt-text`, `jsx-a11y/anchor-has-content` | error |
| Formatting | `prettier/prettier` | error |

## Testing

Tests verify that the configurations behave as intended — both that valid code passes and that invalid code is **rejected** for the intended rule. The test suite uses `node --test` and exercises each preset against positive and negative fixtures:

```sh
npm run test:eslint
```

Type-aware rules are tested against fixture files in `__fixtures__/` using a local `tsconfig.json`.

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
