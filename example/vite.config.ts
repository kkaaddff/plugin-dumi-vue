import { defineConfig } from 'vite';
import { createVuePlugin as vue2 } from 'vite-plugin-vue2';
import { viteExternalsPlugin } from 'vite-plugin-externals';
import path from 'path';

export default async () => {
  return defineConfig({
    resolve: {
      alias: {
        '@/': path.join(process.cwd(), '/'),
      },
    },
    build: {
      lib: {
        entry: 'src',
        formats: ['es'],
        fileName: 'index',
      },
      cssCodeSplit: true,
      rollupOptions: {
        external: ['vue', 'vant'],
      },
      commonjsOptions: {
        include: /node_modules|packages/,
      },
      outDir: 'lib',
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },

    plugins: [
      vue2({
        target: 'esnext',
      }),
      // external插件件必须在createVuePlugin下面
      viteExternalsPlugin({
        vue: 'window.Vue',
        vant: 'window.vant',
      }),
    ],
  });
};
