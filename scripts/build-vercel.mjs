/**
 * Post-build script: packages TanStack Start output into
 * Vercel Build Output API v3 (.vercel/output/).
 *
 * Layout:
 *   .vercel/output/
 *     config.json                  – routing rules
 *     static/                      – CDN (client assets + public files)
 *     functions/
 *       __nitro.func/              – Node.js serverless function
 *         .vc-config.json
 *         handler.js               – Node HTTP → Web Fetch bridge
 *         server.js                – esbuild-bundled SSR (all npm deps included)
 */

import { execSync } from "node:child_process";
import { cpSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const out = resolve(root, ".vercel/output");
const func = `${out}/functions/__nitro.func`;

// ── 1. clean ──────────────────────────────────────────────────────────────────
rmSync(out, { recursive: true, force: true });
mkdirSync(`${out}/static`, { recursive: true });
mkdirSync(func, { recursive: true });

// ── 2. static assets ──────────────────────────────────────────────────────────
cpSync(`${root}/dist/client/assets`, `${out}/static/assets`, { recursive: true });
cpSync(`${root}/public`, `${out}/static`, { recursive: true });

// ── 3. bundle server + all npm deps into one self-contained ESM file ──────────
// The Vite SSR output has external npm imports (@supabase/*, @tanstack/*, etc.)
// that won't resolve in a serverless function without node_modules. esbuild
// re-bundles everything into a single file so the function needs no node_modules.
console.log("Bundling server...");
execSync(
  [
    `"${root}/node_modules/.bin/esbuild"`,
    `"${root}/dist/server/server.js"`,
    "--bundle",
    "--format=esm",
    "--platform=node",
    "--target=node22",
    "--minify",
    `"--external:node:*"`,
    `"--outfile=${func}/server.js"`,
    "--log-level=warning",
  ].join(" "),
  { stdio: "inherit", cwd: root }
);
console.log("Server bundled.");

// ── 4. write Node.js HTTP → Web Fetch bridge ──────────────────────────────────
// package.json tells Node this directory is ESM (required for import statements)
writeFileSync(`${func}/package.json`, JSON.stringify({ type: "module" }, null, 2));

writeFileSync(
  `${func}/handler.js`,
  `
import serverModule from "./server.js";

export default async function handler(req, res) {
  try {
    const protocol = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers["x-forwarded-host"] || req.headers["host"] || "localhost";
    const url = new URL(req.url, protocol + "://" + host);

    const headers = {};
    for (const [k, v] of Object.entries(req.headers)) {
      if (v !== undefined) headers[k] = Array.isArray(v) ? v.join(", ") : v;
    }

    let body;
    if (req.method !== "GET" && req.method !== "HEAD") {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      if (chunks.length) body = Buffer.concat(chunks);
    }

    const request = new Request(url.toString(), { method: req.method, headers, body });
    const response = await serverModule.fetch(request, {}, {});

    res.statusCode = response.status;
    for (const [name, value] of response.headers.entries()) res.setHeader(name, value);
    res.end(Buffer.from(await response.arrayBuffer()));
  } catch (err) {
    console.error("[ssr]", err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}
`.trimStart()
);

// ── 5. function config ────────────────────────────────────────────────────────
writeFileSync(
  `${func}/.vc-config.json`,
  JSON.stringify(
    { runtime: "nodejs22.x", handler: "handler.js" },
    null,
    2
  )
);

// ── 6. routing ────────────────────────────────────────────────────────────────
writeFileSync(
  `${out}/config.json`,
  JSON.stringify(
    {
      version: 3,
      routes: [
        {
          src: "^/assets/(.*)$",
          headers: { "cache-control": "public, max-age=31536000, immutable" },
          continue: true,
        },
        {
          src: "^/([^/]+\\.[a-z0-9]+)$",
          headers: { "cache-control": "public, max-age=3600" },
          continue: true,
        },
        { src: "/(.*)", dest: "/__nitro" },
      ],
    },
    null,
    2
  )
);

console.log("✓ .vercel/output/ ready");
