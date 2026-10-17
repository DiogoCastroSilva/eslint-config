// Test suite for @diogozx-org/eslint-config — publishes to npm via OIDC from repo frontend-tooling
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { ESLint } from "eslint";

import config from "./index.js";
import nextConfig from "./next.js";
import storybookConfig from "./storybook.js";
import reactConfig from "./react.js";
import typeCheckedConfig from "./type-checked.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function fixture(rel) {
  return path.join(__dirname, "__fixtures__", rel);
}

function makeLinter(usingConfig) {
  return new ESLint({
    overrideConfig: usingConfig,
    overrideConfigFile: true,
    cwd: __dirname,
  });
}

async function assertNoErrors(eslint, code, filePath) {
  const [result] = await eslint.lintText(code, { filePath });
  assert.equal(result.fatalErrorCount, 0, JSON.stringify(result.messages));
  assert.equal(result.errorCount, 0, JSON.stringify(result.messages));
}

async function assertHasErrors(eslint, code, filePath, expectedRuleId) {
  const [result] = await eslint.lintText(code, { filePath });
  assert.ok(
    result.errorCount > 0 || result.fatalErrorCount > 0,
    `Expected errors but got none. Messages: ${JSON.stringify(result.messages)}`,
  );
  if (expectedRuleId) {
    const matched = result.messages.some((m) => m.ruleId === expectedRuleId);
    assert.ok(
      matched,
      `Expected rule "${expectedRuleId}" but got: ${JSON.stringify(result.messages.map((m) => m.ruleId))}`,
    );
  }
}

async function assertFileHasErrors(eslint, fixtureFile, expectedRuleId) {
  const [result] = await eslint.lintFiles([fixture(fixtureFile)]);
  assert.ok(
    result.errorCount > 0 || result.fatalErrorCount > 0,
    `Expected errors in ${fixtureFile} but got none. Messages: ${JSON.stringify(result.messages)}`,
  );
  if (expectedRuleId) {
    const matched = result.messages.some((m) => m.ruleId === expectedRuleId);
    assert.ok(
      matched,
      `Expected rule "${expectedRuleId}" in ${fixtureFile} but got: ${JSON.stringify(result.messages.map((m) => m.ruleId))}`,
    );
  }
}

async function assertFileNoErrors(eslint, fixtureFile) {
  const [result] = await eslint.lintFiles([fixture(fixtureFile)]);
  assert.equal(result.fatalErrorCount, 0, JSON.stringify(result.messages));
  assert.equal(result.errorCount, 0, JSON.stringify(result.messages));
}

// ---------------------------------------------------------------------------
// Structural tests
// ---------------------------------------------------------------------------

test("index config exports a flat config array", () => {
  assert.ok(Array.isArray(config));
  assert.ok(config.length > 0);
});

test("type-checked config includes type-aware rules", () => {
  assert.ok(Array.isArray(typeCheckedConfig));
  const hasTypeAware = typeCheckedConfig.some(
    (item) =>
      item.rules && item.rules["@typescript-eslint/no-unsafe-assignment"] === "error",
  );
  assert.ok(hasTypeAware, "Expected type-checked config to enable no-unsafe-assignment");
});

test("react config includes jsx-a11y and react-hooks rules", () => {
  const hasA11y = reactConfig.some(
    (item) => item.rules && Object.keys(item.rules).some((r) => r.startsWith("jsx-a11y/")),
  );
  assert.ok(hasA11y, "Expected jsx-a11y rules in react config");

  const hasHooks = reactConfig.some(
    (item) => item.rules && Object.keys(item.rules).some((r) => r.startsWith("react-hooks/")),
  );
  assert.ok(hasHooks, "Expected react-hooks rules in react config");
});

test("Next.js preset exports the official config and generated-file ignores", () => {
  assert.ok(Array.isArray(nextConfig));
  assert.ok(
    nextConfig.some((item) => item.ignores?.includes(".next/**")),
    "Expected the Next.js preset to ignore generated .next output",
  );
  assert.ok(
    nextConfig.some((item) => item.ignores?.includes("out/**")),
    "Expected the Next.js preset to ignore out/ output",
  );
});

// ---------------------------------------------------------------------------
// Base config (index.js) — non-type-aware
// ---------------------------------------------------------------------------

test("base config: valid TypeScript passes", async () => {
  const eslint = makeLinter(config);
  await assertNoErrors(eslint, "export const answer: number = 42;\n", "sample.ts");
});

test("base config: no-explicit-any rejects explicit any", async () => {
  const eslint = makeLinter(config);
  await assertHasErrors(
    eslint,
    "export const risky: any = 42;\n",
    "sample.ts",
    "@typescript-eslint/no-explicit-any",
  );
});

test("base config: no-unused-vars rejects unused variables", async () => {
  const eslint = makeLinter(config);
  await assertHasErrors(
    eslint,
    "const unused = 1;\nexport function ok(): number { return 0; }\n",
    "sample.ts",
    "@typescript-eslint/no-unused-vars",
  );
});

// ---------------------------------------------------------------------------
// Type-checked config (type-checked.js) — type-aware
// ---------------------------------------------------------------------------

test("type-checked config: valid type-safe TypeScript passes", async () => {
  const eslint = makeLinter(typeCheckedConfig);
  await assertFileNoErrors(eslint, "valid-type-checked.ts");
});

test("type-checked config: no-unsafe-assignment rejects any assignment", async () => {
  const eslint = makeLinter(typeCheckedConfig);
  await assertFileHasErrors(eslint, "invalid-unsafe-any.ts", "@typescript-eslint/no-unsafe-assignment");
});

test("type-checked config: no-floating-promises rejects unhandled promises", async () => {
  const eslint = makeLinter(typeCheckedConfig);
  await assertFileHasErrors(eslint, "invalid-floating-promise.ts", "@typescript-eslint/no-floating-promises");
});

// ---------------------------------------------------------------------------
// React config (react.js) — hooks and a11y
// ---------------------------------------------------------------------------

test("react config: valid accessible component passes", async () => {
  const eslint = makeLinter(reactConfig);
  await assertNoErrors(
    eslint,
    'export const Button = () => <button type="button">Save</button>;\n',
    "Button.tsx",
  );
});

test("react config: rules-of-hooks rejects conditional hook calls", async () => {
  const eslint = makeLinter(reactConfig);
  const code = [
    'import { useState } from "react";',
    "export function Component({ cond }: { cond: boolean }) {",
    "  if (cond) {",
    "    useState(0);",
    "  }",
    "  return null;",
    "}",
    "",
  ].join("\n");
  await assertHasErrors(eslint, code, "Component.tsx", "react-hooks/rules-of-hooks");
});

test("react config: jsx-a11y catches missing alt on images", async () => {
  const eslint = makeLinter(reactConfig);
  const code = 'export const Logo = () => <img src="logo.png" />;\n';
    await assertHasErrors(eslint, code, "Logo.tsx", "jsx-a11y/alt-text");
});

// ---------------------------------------------------------------------------
// Storybook config — CSF stories
// ---------------------------------------------------------------------------

test("Storybook config: valid CSF story passes", async () => {
  const eslint = makeLinter(storybookConfig);
  const code = [
    'import type { Meta, StoryObj } from "@storybook/react-vite";',
    "const Example = () => null;",
    'const meta = { title: "Example/Button", component: Example } satisfies Meta;',
    "export default meta;",
    "type Story = StoryObj<typeof meta>;",
    "export const Default: Story = {};",
    "",
  ].join("\n");
  await assertNoErrors(eslint, code, "button.stories.tsx");
});
