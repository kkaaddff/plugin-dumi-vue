import { createVuePlugin as vue2 } from 'vite-plugin-vue2';
import { viteExternalsPlugin } from 'vite-plugin-externals';
import { build } from 'vite';
import path from 'path';

export default async function buildVue(inputPath: string) {
  const bundle = await build({
    configFile: false,
    build: {
      cssCodeSplit: true,
      lib: {
        entry: inputPath,
        formats: ['es'],
        fileName: (format) => {
          return path.basename(inputPath).replace(/\.vue$/, '.js');
        },
      },
      commonjsOptions: {
        include: /node_modules|packages/,
      },
      outDir: path.join(path.dirname(inputPath), 'dist'),
      rollupOptions: {
        external: ['vue', 'vant'],
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

  const output = bundle[0].output;
  const code =
    output.find((file: any) => file.fileName.endsWith('.js'))?.code ?? '';
  const chunkCSS =
    output.find((file: any) => file.fileName.endsWith('.css'))?.source ?? '';

  let injectCode = '';
  if (chunkCSS) {
    const style = `__vite_style__`;
    injectCode =
      `var ${style} = document.createElement('style');` +
      `${style}.innerHTML = ${JSON.stringify(chunkCSS)};` +
      `document.head.appendChild(${style});`;
  }
  return injectCode + code;
}
