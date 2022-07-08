import { defineConfig } from 'dumi';
import { join } from 'path';

export default defineConfig({
  title: '单物料开发',
  outputPath: 'docs-dist',
  publicPath: './',
  history: { type: 'hash' },
  resolve: {
    previewLangs: ['jsx', 'tsx', 'html'],
    passivePreview: true,
  },
  // dynamicImport: {},
  dynamicImportSyntax: {},
  plugins: [join(__dirname, '..', 'lib')],
  targets: {
    chrome: 90,
    firefox: false,
    safari: false,
    edge: false,
    ios: false,
  },
  alias: {
    '@examples': join(process.cwd(), 'examples'),
  },
  externals: {
    vue: 'window.Vue',
    vant: 'window.vant',
  },
  scripts: [
    'https://cdn.bootcdn.net/ajax/libs/vue/2.6.14/vue.esm.js',
    'https://cdn.bootcdn.net/ajax/libs/vant/2.12.47/vant.js',
    `(function(){
          window.Vue.use(window.vant);
      })();`,
  ],
  styles: ['https://cdn.bootcdn.net/ajax/libs/vant/2.12.47/index.css'],
  // more config: https://d.umijs.org/config
});
