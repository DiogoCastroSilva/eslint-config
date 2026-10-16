import baseConfig from "./base.js";
import prettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  ...baseConfig,
  // Keep this last so Prettier can disable conflicting formatting rules.
  prettierRecommended,
];
