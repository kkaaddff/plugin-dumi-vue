'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const vite_plugin_vue2_1 = require('vite-plugin-vue2');
const vite_plugin_externals_1 = require('vite-plugin-externals');
const vite_1 = require('vite');
const path_1 = __importDefault(require('path'));
async function buildVue(inputPath) {
  const bundle = await (0, vite_1.build)({
    configFile: false,
    build: {
      cssCodeSplit: true,
      lib: {
        entry: inputPath,
        formats: ['es'],
        fileName: (format) => {
          return path_1.default.basename(inputPath).replace(/\.vue$/, '.js');
        },
      },
      commonjsOptions: {
        include: /node_modules|packages/,
      },
      outDir: path_1.default.join(path_1.default.dirname(inputPath), 'dist'),
      rollupOptions: {
        external: ['vue', 'vant'],
      },
    },
    plugins: [
      (0, vite_plugin_vue2_1.createVuePlugin)({
        target: 'esnext',
      }),
      // external插件件必须在createVuePlugin下面
      (0, vite_plugin_externals_1.viteExternalsPlugin)({
        vue: 'window.Vue',
        vant: 'window.vant',
      }),
    ],
  });
  const output = bundle[0].output;
  const code = output.find((file) => file.fileName.endsWith('.js'))?.code ?? '';
  const chunkCSS =
    output.find((file) => file.fileName.endsWith('.css'))?.source ?? '';
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
exports.default = buildVue;
