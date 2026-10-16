import assert from "node:assert/strict";
import test from "node:test";
import { ESLint } from "eslint";

import config from "./index.js";
import nextConfig from "./next.js";
import storybookConfig from "./storybook.js";
import reactConfig from "./react.js";

test("exports an ESLint flat config array", () => {
  assert.ok(Array.isArray(config));
  assert.ok(config.length > 0);
});

test("lints TypeScript with the shared config", async () => {
  const eslint = new ESLint({
    overrideConfig: config,
    overrideConfigFile: true,
  });

  const [result] = await eslint.lintText("export const answer: number = 42;\n", {
    filePath: "sample.ts",
  });

  assert.equal(result.fatalErrorCount, 0);
  assert.equal(result.errorCount, 0, JSON.stringify(result.messages));
});

test("Next.js preset exports the official config and generated-file ignores", () => {
  assert.ok(Array.isArray(nextConfig));
  assert.ok(
    nextConfig.some((item) => item.ignores?.includes(".next/**")),
    "Expected the Next.js preset to ignore generated .next output",
  );
});

test("Storybook preset lints a valid CSF story", async () => {
  const eslint = new ESLint({
    overrideConfig: storybookConfig,
    overrideConfigFile: true,
  });

  const [result] = await eslint.lintText(
    [
      'import type { Meta, StoryObj } from "@storybook/react-vite";',
      "const Example = () => null;",
      'const meta = { title: "Example/Button", component: Example } satisfies Meta;',
      "export default meta;",
      "type Story = StoryObj<typeof meta>;",
      "export const Default: Story = {};",
      "",
    ].join("\n"),
    { filePath: "button.stories.tsx" },
  );

  assert.equal(result.fatalErrorCount, 0, JSON.stringify(result.messages));
  assert.equal(result.errorCount, 0, JSON.stringify(result.messages));
});

test("React preset accepts a simple accessible component", async () => {
  const eslint = new ESLint({
    overrideConfig: reactConfig,
    overrideConfigFile: true,
  });

  const [result] = await eslint.lintText(
    'export const Button = () => <button type="button">Save</button>;\\n',
    { filePath: "Button.tsx" },
  );

  assert.equal(result.fatalErrorCount, 0, JSON.stringify(result.messages));
  assert.equal(result.errorCount, 0, JSON.stringify(result.messages));
});
