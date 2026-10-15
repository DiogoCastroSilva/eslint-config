# @diogozx-org/eslint-config

[![npm version](https://img.shields.io/npm/v/%40diogozx-org%2Feslint-config)](https://www.npmjs.com/package/@diogozx-org/eslint-config)

Reusable ESLint **flat configs** for TypeScript projects and Next.js, with Prettier formatting checks.

## Requirements

- Node.js 20.19+, 22.13+, or 24+
- ESLint 9 or 10
- TypeScript 5.3+
- Prettier 3

## TypeScript config

Install the config and its peer requirements:

```sh
npm install --save-dev @diogozx-org/eslint-config eslint prettier typescript
```

Create `eslint.config.js` in your project root:

```js
import config from "@diogozx-org/eslint-config";

export default config;
```

This enables the recommended TypeScript ESLint rules and reports Prettier formatting violations as ESLint errors. The config package supplies the TypeScript ESLint and Prettier ESLint integrations, so you do not need to install those plugins separately.

## Next.js config

The Next.js preset composes the shared TypeScript/Prettier config with the official Next.js Core Web Vitals and TypeScript presets.

Install the additional Next.js config dependency using the version compatible with your app. The projects that motivated this preset currently use Next.js 16.4.0 in the Fieldnote lab and Next.js 16.2.9 in jury-management; the peer range supports both.

```sh
npm install --save-dev @diogozx-org/eslint-config eslint-config-next eslint prettier typescript
```

Then use the dedicated export in your app's `eslint.config.mjs`:

```js
import nextConfig from "@diogozx-org/eslint-config/next";

export default nextConfig;
```

The preset includes these global ignores: `.next/**`, `out/**`, `build/**`, and `next-env.d.ts`. It expects to be used as the app's ESLint config, with `eslint-config-next` installed in that app. It does not pin Next.js itself or install a Next.js version for you.

## What the configs enable

- Recommended TypeScript ESLint rules
- Prettier formatting violations reported as ESLint errors
- No requirement for explicit function return types or member accessibility modifiers
- For Next.js projects: the official Next.js Core Web Vitals and TypeScript rules

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
