import assert from "node:assert/strict";
import test from "node:test";

import config from "./index.js";

test("exports the shared formatting policy", () => {
  assert.equal(config.semi, true);
  assert.equal(config.singleQuote, false);
  assert.equal(config.trailingComma, "all");
  assert.equal(config.printWidth, 80);
  assert.equal(config.tabWidth, 2);
  assert.equal(config.endOfLine, "lf");
});
