import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://www.lalauw.com",
  output: "static",
  markdown: {
    shikiConfig: { theme: "github-light" }
  },
  build: {
    format: "directory"
  }
});
