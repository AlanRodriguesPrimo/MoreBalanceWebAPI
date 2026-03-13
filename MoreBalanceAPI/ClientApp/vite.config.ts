import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/person": {
                target: "https://localhost:7165",
                changeOrigin: true,
                secure: false
            }
        }
    }
});