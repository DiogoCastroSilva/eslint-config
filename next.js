import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import baseConfig from "./index.js";

/**
 * Next.js flat config preset.
 *
 * Requires eslint-config-next to be installed by the consuming project.
 * Keep the shared config after the Next.js presets so its TypeScript rules
 * apply consistently and Prettier remains the final rule layer.
 */
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  ...baseConfig,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);
