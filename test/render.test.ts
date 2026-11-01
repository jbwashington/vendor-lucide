// Our src/Icon.tsx must render byte-identical markup to upstream's pristine Icon/createLucideIcon
// for the same icon node, across the props consumers pass.
import { expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { createIcon, type IconNode } from "../src/Icon";
import createLucideIcon from "../upstream/packages/lucide-react/src/createLucideIcon";

// Same class computation scripts/vendor-icons.ts does in consumers.
const classesFor = (name: string) => {
  const camel = name.replace(/^([A-Z])|[\s-_]+(\w)/g, (_m, p1, p2) => (p2 ? p2.toUpperCase() : p1.toLowerCase()));
  const pascal = camel.charAt(0).toUpperCase() + camel.slice(1);
  const kebab = pascal.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  return [...new Set([`lucide-${kebab}`, `lucide-${name}`])].join(" ");
};

const nodes: Record<string, IconNode> = {
  "arrow-right": [["path", { d: "M5 12h14", key: "1ays0h" }], ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]],
  "bar-chart-3": [["path", { d: "M3 3v18h18", key: "a" }], ["rect", { x: 7, y: 10, width: 3, height: 8, key: "b" }]],
  "circle": [["circle", { cx: 12, cy: 12, r: 10, key: "c" }]],
};
const props: Record<string, unknown>[] = [
  {}, { size: 16 }, { size: "1.5em" }, { color: "red" }, { strokeWidth: 1.5 }, { absoluteStrokeWidth: true, size: 48 },
  { className: "h-4 w-4" }, { className: "lucide" }, { "aria-label": "go" }, { role: "img" }, { title: "t" },
  { "data-x": "1", onClick: () => {} }, { className: "  " },
];

for (const [name, node] of Object.entries(nodes)) {
  const Ours = createIcon("X", classesFor(name), node);
  const Theirs = createLucideIcon(name, node);
  for (const p of props) {
    test(`${name} ${JSON.stringify(p)}`, () => {
      expect(renderToStaticMarkup(createElement(Ours, p))).toBe(renderToStaticMarkup(createElement(Theirs, p)));
    });
  }
  test(`${name} with children`, () => {
    const kid = createElement("title", null, "hi");
    expect(renderToStaticMarkup(createElement(Ours, {}, kid))).toBe(renderToStaticMarkup(createElement(Theirs, {}, kid)));
  });
}

test("license is upstream's", () =>
  expect(readFileSync(new URL("../src/LICENSE", import.meta.url), "utf8")).toBe(
    readFileSync(new URL("../upstream/LICENSE", import.meta.url), "utf8")));
