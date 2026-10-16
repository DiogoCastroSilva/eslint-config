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
│       ├── performance-audit.yml
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

## Performance audit

This repository publishes a reusable, automated website performance audit built on
Google Lighthouse CI. The [`performance-audit.yml`](.github/workflows/performance-audit.yml)
workflow is triggered with `workflow_call`, so any repository can reuse it to
audit its static site on every pull request.

It installs `@lhci/cli@0.15.1` (which bundles **Lighthouse 12.6.1**), serves the
built site locally, runs Lighthouse on each requested URL, asserts configurable
performance budgets, and uploads the full reports as a 30-day artifact. All
measurements are **lab data**; Lighthouse 12.6.1 reports **TBT** (not INP), and
there is no Real User Monitoring.

### Usage

Reference the workflow from a caller workflow, **pinning to a commit SHA** on this
repository's `main` branch (replace `<SHA>` with the commit that last updated
`performance-audit.yml`):

```yaml
  perf-audit:
    name: Performance audit
    runs-on: ubuntu-latest
    needs: ci
    permissions:
      contents: read
      actions: read
    steps:
      - name: Run Lighthouse audit
        uses: DiogoCastroSilva/frontend-tooling/.github/workflows/performance-audit.yml@<SHA>
        with:
          urls: "/, /about/, /projects/first-project/"
          artifact-name: static-site-output
          output-dir: public
```

When `artifact-name` is set, the workflow downloads a site artifact produced by an
earlier job and audits it **without rebuilding**, so no duplicate production build
occurs. To let the workflow build the site itself, omit `artifact-name` and
provide `install-command` (default `npm ci`) and `build-command` (default
`npm run build`).

### Inputs

| Input | Default | Description |
| --- | --- | --- |
| `node-version` | `""` | Node.js version; empty reads `.nvmrc`. |
| `output-dir` | `out` | Built static-site directory (LHCI `staticDistDir`). |
| `urls` | `/` | Comma-separated routes to audit. |
| `install-command` | `npm ci` | Dependency install (build mode only). |
| `build-command` | `npm run build` | Build command (build mode only). |
| `artifact-name` | `""` | Pre-built site artifact to audit instead of building. |
| `budget-path` | `""` | Path to an LHCI assertions JSON overriding the defaults. |
| `number-of-runs` | `3` | Lighthouse runs per URL (the median is kept, reducing noise). |

### Permissions

Least privilege: the job declares `contents: read` and `actions: write` only
because `actions/upload-artifact` requires the latter to publish reports. The
workflow never writes to the repository, comments on pull requests, or creates
deployments, and it needs no secrets.

### Performance budgets

Budgets are defined in [`perf-budgets.json`](perf-budgets.json) and are
**report-only** (`warn` level): a failed budget surfaces as a warning in the job
log and a saved report, but does **not** fail the job. They are tuned to the
reference portfolio site's measured medians (see the before/after report in this
repository's planning notes).

The metrics captured on every run are: Performance, Accessibility, SEO, and
Best Practices scores; LCP, TBT, TTI, CLS, FCP, and Speed Index; total bytes;
and WebP / next-gen image savings (`modern-image-formats`).

To begin enforcing, copy `perf-budgets.json` into the calling repository, raise
thresholds to safe ceilings, and change `warn` to `error`; or pass a custom file
via `budget-path`.

## License

MIT
