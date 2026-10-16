import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import baseConfig from "./base.js";

/**
 * React flat config for React packages that do not use the Next.js preset.
 *
 * Uses the official React Hooks recommended rules and JSX accessibility rules.
 */
export default [
  ...baseConfig,
  {
    files: ["**/*.{jsx,tsx}"],
    ...jsxA11y.flatConfigs.recommended,
  },
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}"],
    ...reactHooks.configs.flat.recommended,
  },
  prettierRecommended,
];
