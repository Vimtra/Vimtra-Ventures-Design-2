import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
    plugins: [react()],
    base: "/Vimtra-Ventures-Design-2/",
    server: { port: 3000, strictPort: true, host: true },
    preview: { port: 4173 },
    build: { target: "es2020", sourcemap: false },
});
