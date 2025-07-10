import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";

export default defineConfig({
  base: "/vuejs-crud-expressjs/",
  plugins: [vue(), vuetify({ autoImport: true })],
  define: {
    "process.env": {},
  },
});
