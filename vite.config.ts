import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import uni from "@dcloudio/vite-plugin-uni";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  resolve: {
    alias: {
      "~device-info": fileURLToPath(new URL("./device-info", import.meta.url)),
    },
  },
  server: {
    host: "0.0.0.0",
  },
});
