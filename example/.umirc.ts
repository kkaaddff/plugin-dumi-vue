import { defineConfig } from 'dumi';
import { join, resolve } from 'path';

export default defineConfig({
  title: 'fta-dumi-vue',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  resolve: {
    previewLangs: ['jsx', 'tsx', 'html'],
  },
  plugins: ['@zhangqc/plugin-dumi-vue'],
  dynamicImport: {},
  targets: {
    chrome: 90,
    firefox: false,
    safari: false,
    edge: false,
    ios: false,
  },
  alias: {
    '@examples': join(process.cwd(), 'examples'),
    vue$: 'vue/dist/vue.esm.js', // 使用带compiler的环境
  },
  // more config: https://d.umijs.org/config
});
