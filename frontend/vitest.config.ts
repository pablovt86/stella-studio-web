import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  // 1. Definimos que la raíz de Vite ahora es la carpeta frontend
  root: "frontend", 
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    // 2. Ajustamos las rutas de los tests (suben un nivel porque root cambia el origen)
    setupFiles: ["./test/setup.ts"],
    include: ["/**/*.{test,spec}.{ts,tsx}"],
  },
  resolve: {
    // 3. Corregimos el alias para que apunte a frontend/src
    alias: { "@": path.resolve(__dirname, "./frontend/src") },
  },
});
