import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteCommonjs, esbuildCommonjs } from '@originjs/vite-plugin-commonjs';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [viteCommonjs(), react()],
    optimizeDeps: {
        plugins: [esbuildCommonjs(['@whatsapp.clone/common'])],
    },
});
