// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readdirSync } from 'fs';

function getHtmlFiles() {
  const pagesDir = resolve(__dirname, 'pages');
  const files = readdirSync(pagesDir);
  const htmlFiles = files.filter(file => file.endsWith('.html'));
  const entries = htmlFiles.reduce((acc, file) => {
    const name = file.replace('.html', '');
    acc[name] = resolve(pagesDir, file);
    return acc;
  }, {});

  return entries;
}

export default defineConfig({
  build: {
    minify: 'esbuild',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ...getHtmlFiles(),
      },
    },
  },
  server: {
    strictPort: true,
    open: true,
    watch: {
      additionalWatchFiles: ['pages/**/*.html'],
    },
  },
});

