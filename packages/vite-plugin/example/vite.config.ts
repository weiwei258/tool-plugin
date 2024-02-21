import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import loadMapFilePlugin from '@tool-plugin/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  // 其他配置...
  build: {
    sourcemap: true,
  },
  plugins: [
    react(),
    loadMapFilePlugin({
      appId: 'mGGeXsyR',
      appKey: 'd232ab18af1da3e70cd2934ccd01aa02',
    }),
  ],
});
