import storybook from "eslint-plugin-storybook";
import baseConfig from "./index.js";

/**
 * Storybook flat config.
 *
 * Apply the Storybook recommended rules before the shared TypeScript and
 * Prettier rules so Prettier remains the final rule layer.
 */
export default [...storybook.configs["flat/recommended"], ...baseConfig];
