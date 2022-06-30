import { build } from 'vite';
import path from 'path';

export default async function buildVue(inputPath: string) {
  const { name } = require(path.join(process.cwd(), 'package.json'));

  const bundle = await build({
    resolve: {
      alias: {
        [name]: path.join(process.cwd(), 'src'),
      },
    },
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
    },
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
