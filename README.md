<h1 align="center">
  eslint-config
</h1>

<h3 align="center">
  An ESLint config standard for my projects
</h3>

<p align="center">
This is a ESLint config that you can use in your projects.
</p>

<p align="center">
  <a href="https://github.com/DiogoCastroSilva/eslint-config/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="eslint-config is released under the MIT license." />
  </a>
  <a href="https://www.npmjs.com/package/@DiogoCastroSilva/eslint-config">
    <img src="https://img.shields.io/npm/v/@DiogoCastroSilva/eslint-config.svg" alt="Current npm package version." />
  </a>
</p>

## 🚀 Get Up and Running

You can install this package using your favorite package manager. This configuration assumes that you have **ESLint**, **Typescript** and **Prettier** already installed; if not, install the following additional dependencies.

```text
typescript eslint prettier
```

### Add the new dependencies

**If you are using yarn:**

```shell
yarn add -D @DiogoCastroSilva/eslint-config @typescript-eslint/eslint-plugin eslint-plugin-prettier
```

**If you are using npm:**

```shell
npm install --save-dev @DiogoCastroSilva/eslint-config @typescript-eslint/eslint-plugin eslint-plugin-prettier
```

### Tell ESLint to use this config

Create an `.eslintrc.js`  file in the root of your project and add the following code:

``` js
module.exports = {
  extends: ['@DiogoCastroSilva/eslint-config'],
};
```

At this point you should be good to go 👍

## :memo: License

Licensed under the [MIT License](./LICENSE).
