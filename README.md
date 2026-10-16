# Frontend Tooling

Reusable configuration packages for consistent frontend and TypeScript engineering across projects.

This repository contains three independently versioned npm packages. The existing ESLint package remains at the repository root to preserve its release workflow; the other packages live under `packages/`.

## Packages

| Package | Purpose | Guide |
| --- | --- | --- |
| [`@diogozx-org/eslint-config`](https://www.npmjs.com/package/@diogozx-org/eslint-config) | ESLint flat configs for TypeScript, React, Next.js, and Storybook, with Prettier integration | [ESLint config](#eslint-config) |
| [`@diogozx-org/tsconfig`](https://www.npmjs.com/package/@diogozx-org/tsconfig) | TypeScript compiler presets for Next.js, React libraries, Vite, and Node.js | [TypeScript presets](packages/tsconfig/README.md) |
| [`@diogozx-org/prettier-config`](https://www.npmjs.com/package/@diogozx-org/prettier-config) | Shared Prettier formatting defaults | [Prettier config](packages/prettier-config/README.md) |

## ESLint config

### Requirements

- Node.js 20.19+, 22.13+, or 24+
- ESLint 9 or 10
- TypeScript 5.3+
- Prettier 3

Install the package and peer requirements:

```sh
npm install --save-dev @diogozx-org/eslint-config eslint prettier typescript
```

Create `eslint.config.mjs`:

```js
import config from "@diogozx-org/eslint-config";

export default config;
```

The base preset enables recommended TypeScript ESLint rules and reports Prettier formatting violations as ESLint errors. The package supplies the TypeScript ESLint and Prettier integrations.

### Next.js

Install `eslint-config-next` using a version compatible with your app:

```sh
npm install --save-dev @diogozx-org/eslint-config eslint-config-next eslint prettier typescript
```

```js
import nextConfig from "@diogozx-org/eslint-config/next";

export default nextConfig;
```

This preset includes ignores for `.next/**`, `out/**`, `build/**`, and `next-env.d.ts`. It expects `eslint-config-next` to be installed by the consuming app.

### React

Use this for React packages that are not already using the Next.js preset:

```js
import reactConfig from "@diogozx-org/eslint-config/react";

export default reactConfig;
```

This includes the recommended React Hooks and JSX accessibility rules. Keep framework-specific configuration, aliases, and generated-file ignores local to the consuming project.

### Storybook

Install `eslint-plugin-storybook` alongside the shared config:

```sh
npm install --save-dev @diogozx-org/eslint-config eslint-plugin-storybook eslint prettier typescript
```

```js
import storybookConfig from "@diogozx-org/eslint-config/storybook";

export default storybookConfig;
```

The Storybook plugin is an optional peer dependency.

## Development

Run tests for the root ESLint package:

```sh
npm install --package-lock=false
npm test
```

Run the other package tests:

```sh
npm --prefix packages/tsconfig test
npm --prefix packages/prettier-config test
```

## Publishing

GitHub Actions publishes the root ESLint package when its `package.json` or publishing workflow changes on `main`. A separate workflow publishes the TypeScript and Prettier packages when their files or shared-package workflow changes.

Publishing uses npm Trusted Publishing (OIDC). Configure a Trusted Publisher separately for each npm package:

- GitHub owner: `DiogoCastroSilva`
- Repository: `frontend-tooling`
- Workflow file: `publish.yml` for the root ESLint package; `publish-config-packages.yml` for the packages under `packages/`
- Environment: leave blank unless the workflow is changed to use a GitHub environment

**After the GitHub repository rename, update the Trusted Publisher configuration for the existing ESLint package too.** Its old repository name no longer matches. Each new npm package also needs its own configuration. If npm does not accept the first publication through Trusted Publishing, publish that package once with authorized npm credentials, then configure Trusted Publishing for future releases.

The shared-package workflow checks whether the exact version is already published and rechecks after a failed publish to handle concurrent releases safely.

## License

MIT
