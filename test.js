import assert from "node:assert/strict";
import test from "node:test";
import { ESLint } from "eslint";

import config from "./index.js";

test("exports an ESLint flat config array", () => {
  assert.ok(Array.isArray(config));
  assert.ok(config.length > 0);
});

test("lints TypeScript with the shared config", async () => {
  const eslint = new ESLint({
    overrideConfig: config,
    overrideConfigFile: true,
  });

  const [result] = await eslint.lintText('export const answer: number = 42;\n', {
    filePath: "sample.ts",
  });

  assert.equal(result.fatalErrorCount, 0);
  assert.equal(result.errorCount, 0, JSON.stringify(result.messages));
});
