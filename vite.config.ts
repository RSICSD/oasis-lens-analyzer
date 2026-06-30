import { defineConfig } from "vite";
import type {} from "nitro/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  nitro: {
    preset: "vercel",
  },
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart({
      server: { entry: "server" },
    }),
  ],
  resolve: {
    alias: { "@": resolve(__dirname, "src") },
    dedupe: ["react", "react-dom", "@tanstack/react-router"],
  },
});
