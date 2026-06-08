import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // <- Esto le dice a Vitest que simule un navegador
    globals: true,        // <- Esto permite usar describe, it, expect globales
    setupFiles: ["./src/test/setup.ts"], // <- Enlaza el limpiador de MSW que ya tienes listo
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});