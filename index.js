import prettierRecommended from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";

export default tseslint.config(
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"],
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-member-accessibility": "off",
    },
  },
  // Keep this last so Prettier can disable conflicting formatting rules.
  prettierRecommended,
);
