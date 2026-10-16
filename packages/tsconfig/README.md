# @diogozx-org/tsconfig

Reusable TypeScript compiler presets for the projects in this organization.

## Install

```sh
npm install --save-dev @diogozx-org/tsconfig typescript
```

## Presets

| Preset | Use |
| --- | --- |
| `@diogozx-org/tsconfig/base.json` | Shared strictness and safe compiler defaults |
| `@diogozx-org/tsconfig/strictest.json` | Opt-in additional checks, including unchecked indexed access and exact optional properties |
| `@diogozx-org/tsconfig/nextjs.json` | Next.js app using the bundler module resolver |
| `@diogozx-org/tsconfig/react-library.json` | Source-checked React component package |
| `@diogozx-org/tsconfig/vite.json` | React/Vite app, including Vite client types |
| `@diogozx-org/tsconfig/node.json` | Node.js using NodeNext module resolution |

## Usage

Keep project-specific paths, `include`, and `exclude` settings in the consuming project. Do not add them to these shared presets.

```json
{
  "extends": "@diogozx-org/tsconfig/nextjs.json",
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
```

The base preset enables TypeScript's `strict` family of checks and consistent casing. The additional checks in `strictest.json` are opt-in because `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes` can expose existing code issues. Try them in a branch and fix type errors rather than suppressing them with broad ignores.

These presets do not replace runtime-specific configuration. Next.js, Vite, and Node.js presets set module/runtime options, while the consuming application remains responsible for aliases, source includes, generated types, output paths, and framework plugins.

## Development

```sh
npm test
```

## License

MIT
