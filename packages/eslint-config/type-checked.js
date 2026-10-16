import baseConfig from "./index.js";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";

/**
 * Opt-in type-aware ESLint config.
 *
 * Extends the base preset with type-checked rules from typescript-eslint.
 * These rules require a tsconfig.json in the consuming project's root
 * (parserOptions.project: true enables automatic discovery).
 *
 * Type-aware rules add runtime cost because the TypeScript type checker
 * must load the project. Use this preset when catching unsafe `any` flows,
 * floating promises, and unnecessary type assertions is worth the cost.
 *
 * @example
 * import typeCheckedConfig from "@diogozx-org/eslint-config/type-checked";
 * export default [...typeCheckedConfig, ...yourOverrides];
 */
export default [
  ...baseConfig,
  ...tseslint.configs.recommendedTypeChecked,
  {
    // Enable automatic tsconfig.json discovery for type-aware rules.
    // Consumers must have a tsconfig.json at or near their project root.
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },
  },
  // Keep Prettier last so it can disable conflicting formatting rules.
  prettierRecommended,
];
