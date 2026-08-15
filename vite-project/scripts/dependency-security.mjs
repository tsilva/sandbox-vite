import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { performance } from "node:perf_hooks";

const projectRoot = new URL("..", import.meta.url).pathname;
const storeRoot = join(projectRoot, "node_modules", ".pnpm");
const storeEntries = readdirSync(storeRoot);

function installedPackage(name, storePrefix) {
  const entry = storeEntries.find((candidate) => candidate.startsWith(`${storePrefix}@`));
  assert.ok(entry, `${name} is installed`);
  const packageRoot = join(storeRoot, entry, "node_modules", name);
  const manifest = JSON.parse(readFileSync(join(packageRoot, "package.json"), "utf8"));
  const require = createRequire(join(packageRoot, "package.json"));
  return { module: require(packageRoot), version: manifest.version };
}

function atLeast(actual, expected) {
  const actualParts = actual.split(".").map(Number);
  const expectedParts = expected.split(".").map(Number);
  for (let index = 0; index < 3; index += 1) {
    if (actualParts[index] !== expectedParts[index]) {
      return actualParts[index] > expectedParts[index];
    }
  }
  return true;
}

const bracePackages = storeEntries
  .filter((entry) => entry.startsWith("brace-expansion@"))
  .map((entry) => {
    const packageRoot = join(storeRoot, entry, "node_modules", "brace-expansion");
    const manifest = JSON.parse(readFileSync(join(packageRoot, "package.json"), "utf8"));
    const require = createRequire(join(packageRoot, "package.json"));
    return { module: require(packageRoot), version: manifest.version };
  });

assert.ok(bracePackages.length > 0);
for (const brace of bracePackages) {
  const requiredFloor = brace.version.startsWith("1.") ? "1.1.16" : "5.0.7";
  assert.ok(atLeast(brace.version, requiredFloor), `brace-expansion ${brace.version} is patched`);
  const expand = typeof brace.module === "function" ? brace.module : brace.module.expand;
  assert.equal(typeof expand, "function");
  const started = performance.now();
  const result = expand("{}".repeat(2_000));
  assert.ok(performance.now() - started < 1_000, "hostile brace input is bounded");
  assert.ok(Array.isArray(result));
}

const yaml = installedPackage("js-yaml", "js-yaml");
assert.ok(atLeast(yaml.version, "4.3.1"));
const orderedMap = `!!omap\n${Array.from({ length: 2_000 }, (_, index) => `- key${index}: ${index}`).join("\n")}`;
const yamlStarted = performance.now();
assert.equal(yaml.module.load(orderedMap).length, 2_000);
assert.ok(performance.now() - yamlStarted < 1_000, "hostile ordered map is bounded");
assert.deepEqual(yaml.module.load("safe: true"), { safe: true });

const lock = readFileSync(join(projectRoot, "pnpm-lock.yaml"), "utf8");
assert.match(lock, /'@babel\/core@7\.29\.(?:[6-9]|\d{2,})':/);
assert.match(lock, /postcss@8\.5\.(?:2[3-9]|[3-9]\d):/);
assert.doesNotMatch(lock, /resolution: (?:git|https?|file:)|tarball:/);

console.log("Dependency security checks passed.");
