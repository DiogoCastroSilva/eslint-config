# Frontend Tooling

[![CI](https://github.com/DiogoCastroSilva/frontend-tooling/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/DiogoCastroSilva/frontend-tooling/actions/workflows/ci.yml)

Reusable configuration packages for consistent frontend and TypeScript engineering across projects. Each npm package is independently versioned and published from its own directory under `packages/`.

## Packages

| Package | Version | Purpose | Documentation |
| --- | --- | --- | --- |
| [`@diogozx-org/eslint-config`](https://www.npmjs.com/package/@diogozx-org/eslint-config) | [![npm version](https://img.shields.io/npm/v/%40diogozx-org%2Feslint-config)](https://www.npmjs.com/package/@diogozx-org/eslint-config) | ESLint flat configs for TypeScript, React, Next.js, and Storybook, with Prettier integration | [README](packages/eslint-config/README.md) |
| [`@diogozx-org/tsconfig`](https://www.npmjs.com/package/@diogozx-org/tsconfig) | [![npm version](https://img.shields.io/npm/v/%40diogozx-org%2Ftsconfig)](https://www.npmjs.com/package/@diogozx-org/tsconfig) | TypeScript compiler presets for Next.js, React libraries, Vite, and Node.js | [README](packages/tsconfig/README.md) |
| [`@diogozx-org/prettier-config`](https://www.npmjs.com/package/@diogozx-org/prettier-config) | [![npm version](https://img.shields.io/npm/v/%40diogozx-org%2Fprettier-config)](https://www.npmjs.com/package/@diogozx-org/prettier-config) | Shared Prettier formatting defaults | [README](packages/prettier-config/README.md) |

## Repository layout

```text
frontend-tooling/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── publish.yml
│       └── publish-config-packages.yml
├── packages/
│   ├── eslint-config/
│   ├── prettier-config/
│   └── tsconfig/
├── package.json
├── README.md
└── LICENSE
```

The root `package.json` defines the npm workspace and scripts for testing every package. Each directory under `packages/` contains its own publishable package manifest, implementation, tests, and package README.

## Development

Requirements: Node.js 20.19+, 22.13+, or 24+.

Install dependencies from the repository root:

```sh
npm install --package-lock=false
```

Run all package tests:

```sh
npm test
```

Run an individual package's tests:

```sh
npm run test:eslint
npm run test:tsconfig
npm run test:prettier
```

CI runs all three package test suites on Node.js 20, 22, and 24.

## Publishing

Packages are released independently; a change to one package does not require publishing the others.

- **ESLint:** changes under `packages/eslint-config/` trigger [`publish.yml`](.github/workflows/publish.yml).
- **TypeScript and Prettier:** changes under their respective directories trigger [`publish-config-packages.yml`](.github/workflows/publish-config-packages.yml).

Each workflow checks whether the current package version is already available on npm before publishing. Publishing uses npm Trusted Publishing (OIDC). Configure each package separately in npm with GitHub owner `DiogoCastroSilva`, repository `frontend-tooling`, the relevant workflow filename, and no GitHub environment. The existing ESLint package must trust `publish.yml`; the other two must trust `publish-config-packages.yml`.

For first publication, if npm rejects the trusted publish, publish the package once using authorized npm credentials and then configure Trusted Publishing for subsequent releases. Do not reuse a package version that has already been published; increment that package's version for future releases.

## License

MIT
