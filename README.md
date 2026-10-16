# @diogozx-org/eslint-config

[![npm version](https://img.shields.io/npm/v/%40diogozx-org%2Feslint-config)](https://www.npmjs.com/package/@diogozx-org/eslint-config)

Reusable ESLint **flat configs** for TypeScript projects, Next.js, and Storybook, with Prettier formatting checks.

## Requirements

- Node.js 20.19+, 22.13+, or 24+
- ESLint 9 or 10
- TypeScript 5.3+
- Prettier 3

## Base TypeScript config

Install the config and its peer requirements:

```sh
npm install --save-dev @diogozx-org/eslint-config eslint prettier typescript
```

Create `eslint.config.mjs` in your project root:

```js
import config from "@diogozx-org/eslint-config";

export default config;
```

This enables recommended TypeScript ESLint rules and reports Prettier formatting violations as ESLint errors. The config package supplies the TypeScript ESLint and Prettier integrations, so you do not need to install those plugins separately.

## Next.js preset

The Next.js preset composes the shared TypeScript/Prettier config with the official Next.js Core Web Vitals and TypeScript presets.

Install the additional Next.js config dependency using a version compatible with your app:

```sh
npm install --save-dev @diogozx-org/eslint-config eslint-config-next eslint prettier typescript
```

Then use the dedicated export in your app's `eslint.config.mjs`:

```js
import nextConfig from "@diogozx-org/eslint-config/next";

export default nextConfig;
```

The preset includes these global ignores: `.next/**`, `out/**`, `build/**`, and `next-env.d.ts`. It expects to be used as the app's ESLint config, with `eslint-config-next` installed in that app. It does not pin Next.js itself or install a Next.js version for you.


## React preset

Use this for React packages that are not already using the Next.js preset:

```sh
npm install --save-dev @diogozx-org/eslint-config eslint prettier typescript
```

```js
import reactConfig from "@diogozx-org/eslint-config/react";

export default reactConfig;
```

The preset includes the official React Hooks recommended rules and JSX accessibility recommended rules. The package supplies the React Hooks and JSX accessibility plugins. Keep framework-specific configuration, project aliases, and generated-file ignores local to the consuming project.

## Storybook preset

Install `eslint-plugin-storybook` alongside the shared config:

```sh
npm install --save-dev @diogozx-org/eslint-config eslint-plugin-storybook eslint prettier typescript
```

Use the preset in a Storybook app or in the package containing your stories:

```js
import storybookConfig from "@diogozx-org/eslint-config/storybook";

export default storybookConfig;
```

The preset combines Storybook's flat recommended rules with the shared TypeScript and Prettier rules. The plugin is an optional peer dependency, so consumers that do not use Storybook do not need to install it.

When composing this preset with local configuration, retain any project-specific rules and generated-file ignores. Prefer narrow file patterns and central ignores for generated output over broad source exclusions.

## What the configs enable

- Recommended TypeScript ESLint rules
- Prettier formatting violations reported as ESLint errors
- No requirement for explicit function return types or member accessibility modifiers
- For Next.js projects: official Next.js Core Web Vitals and TypeScript rules
- For Storybook projects: official Storybook recommended rules

## Run ESLint

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
