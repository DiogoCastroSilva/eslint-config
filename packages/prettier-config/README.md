# @diogozx-org/prettier-config

Shared Prettier formatting defaults for TypeScript and frontend projects.

## Install

```sh
npm install --save-dev @diogozx-org/prettier-config prettier
```

Create `prettier.config.mjs`:

```js
import config from "@diogozx-org/prettier-config";

export default config;
```

The shared defaults use semicolons, double quotes, trailing commas, two-space indentation, an 80-column print width, and LF line endings. A project may extend the config for a documented migration or tool-specific need; avoid maintaining a second full copy of the shared options.

For example, a legacy backend that currently uses single quotes can temporarily extend the config:

```js
import config from "@diogozx-org/prettier-config";

export default {
  ...config,
  singleQuote: true,
};
```

## Development

```sh
npm test
```

## License

MIT
