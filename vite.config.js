import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  svgrPlugin({
    svgrOptions: {
      icon: true,
      // ...svgr options (https://react-svgr.com/docs/options/)
    },
  }),],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {}
    }
  }
})
