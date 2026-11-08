import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../", import.meta.url));
const read = p => readFileSync(path.join(root, p), "utf8");
const routes = ["dashboard","settings","profile","system/users","system/notifications","system/audit-log","inventory/products","inventory/stock-levels","inventory/warehouses","inventory/stock-transfers","inventory/purchase-orders","inventory/suppliers","accounting/chart-of-accounts","accounting/journal-entries","accounting/sales-invoices","accounting/payments","accounting/expenses","accounting/customers"];

test("one Next.js app with no separate Vite build", () => {
  const pkg = JSON.parse(read("package.json"));
  assert.equal(pkg.scripts.dev, "next dev");
  assert.equal(pkg.scripts.build, "next build");
  assert.equal(pkg.scripts.predev, undefined);
  assert.equal(pkg.dependencies.react, "^18");
  assert.equal(pkg.devDependencies.tailwindcss, "^3.4.1");
  assert.ok(!existsSync(path.join(root, "admin/package.json")));
  assert.ok(!read("next.config.mjs").includes("/admin-panel/index.html"));
  for (const name of ["vite", "react-router-dom", "motion"]) assert.equal(pkg.dependencies[name], undefined);
});
test("every template screen has a native Next.js page", () => {
  for (const route of routes) assert.ok(existsSync(path.join(root, "src/app/(admin)/admin/(workspace)", route, "page.jsx")), route);
  assert.ok(read("src/admin/navigation.jsx").includes('from "next/navigation"'));
  assert.ok(read("src/admin/navigation.jsx").includes('from "next/link"'));
});
test("public layout and admin layout remain separate", () => {
  const site = read("src/app/(site)/layout.jsx");
  assert.ok(site.includes("<Navbar />"));
  assert.ok(site.includes("<Footer />"));
  assert.ok(site.includes("<SmoothScrollProvider>"));
  const admin = read("src/app/(admin)/admin/layout.jsx");
  assert.ok(!admin.includes("Navbar"));
  assert.ok(admin.includes('className="admin-root"'));
  assert.ok(read("src/admin/styles.css").includes("@tailwind utilities;"));
  assert.ok(!read("src/admin/styles.css").includes("@theme"));
});
test("all admin relative module imports resolve", () => {
  function walk(folder) {
    return readdirSync(folder, {withFileTypes:true}).flatMap(e => e.isDirectory() ? walk(path.join(folder,e.name)) : [path.join(folder,e.name)]);
  }
  for (const file of walk(path.join(root,"src/admin")).filter(p => /\.jsx?$/.test(p))) {
    const source = readFileSync(file,"utf8");
    assert.ok(!source.includes("react-router-dom"));
    for (const match of source.matchAll(/(?:from\s+|import\s*\(\s*)['"](\.[^'"]+)['"]/g))
      assert.ok(existsSync(path.resolve(path.dirname(file), match[1])), file + ": " + match[1]);
  }
});

