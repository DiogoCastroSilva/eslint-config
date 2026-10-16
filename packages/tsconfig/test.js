import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const presets = [
  "base",
  "strictest",
  "nextjs",
  "react-library",
  "vite",
  "node",
];

async function readPreset(name) {
  return JSON.parse(await readFile(new URL(`./${name}.json`, import.meta.url), "utf8"));
}

test("every TypeScript preset is valid JSON and inherits strict base settings", async () => {
  for (const name of presets) {
    const preset = await readPreset(name);
    assert.ok(preset.compilerOptions, `${name} should declare compiler options`);
    if (name !== "base") {
      assert.equal(typeof preset.extends, "string", `${name} should extend another preset`);
    }
  }
  const base = await readPreset("base");
  assert.equal(base.compilerOptions.strict, true);
  assert.equal(base.compilerOptions.forceConsistentCasingInFileNames, true);
  assert.equal(base.compilerOptions.noFallthroughCasesInSwitch, true);
});

test("strictest preset opts into additional checks without forcing them on every app", async () => {
  const base = await readPreset("base");
  const strictest = await readPreset("strictest");
  assert.equal(base.compilerOptions.noUncheckedIndexedAccess, undefined);
  assert.equal(strictest.compilerOptions.noUncheckedIndexedAccess, true);
  assert.equal(strictest.compilerOptions.exactOptionalPropertyTypes, true);
});

test("shared presets do not prescribe app-specific aliases or source includes", async () => {
  for (const name of presets) {
    const preset = await readPreset(name);
    assert.equal(preset.compilerOptions.paths, undefined, `${name} should not own aliases`);
    assert.equal(preset.include, undefined, `${name} should not own source includes`);
    assert.equal(preset.exclude, undefined, `${name} should not own source exclusions`);
  }
});
