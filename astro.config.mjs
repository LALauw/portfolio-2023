import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://www.lalauw.com",
  output: "static",
  vite: {
    plugins: [tailwindcss()]
  },
  build: {
    format: "directory"
  }
});
