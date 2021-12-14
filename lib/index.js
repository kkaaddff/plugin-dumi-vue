'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const path_1 = require('path');
const cache_1 = __importDefault(require('./cache'));
const buildVue_1 = __importDefault(require('./buildVue'));
const additionalAssetsPlugin_1 = __importDefault(
  require('./additionalAssetsPlugin'),
);
exports.default = api => {
  // 全局变量 缓存 vue 编译产物
  globalThis.assetsCache = cache_1.default;
  // 注册编译时
  api.register({
    key: 'dumi.registerCompiletime',
    fn: () => {
      return {
        // 编译时名称，唯一
        name: 'testregisterCompiletime',
        // demo 渲染组件
        component: (0, path_1.join)(__dirname, 'previewer.js'),
        // demo 语法树节点编译函数
        transformer: ({
          attrs, // code 标签的属性
          mdAbsPath, // 当前 Markdown 文件的路径
          node, // 语法树节点
        }) => {
          const { source, lang } = node.properties;
          const vueRelativePath = (0, path_1.relative)(
            api?.paths?.absSrcPath ?? '/',
            mdAbsPath,
          ).replace(/\.md$/, '.vue');
          /**
           * 1.tempVuePath 相对路径
           * 在调用 umi 的 writeTmpFile 方法时，直接用相对路径即可
           */
          const tempVuePath = (0, path_1.join)('dumi', 'vue', vueRelativePath);
          /**
           * 2.tempJsPath js 缓存的路径
           * vue compiler 打包后的 js 文件
           */
          //! 注意一定要绝对路径
          const buildJsPath = 'vue/' + vueRelativePath.replace(/\.vue$/, '.js');
          /**
           * 3.absVuePath 相对路径
           * 在使用 vite 手动 compile 时，需要使用绝对路径
           */
          const absVuePath = (0, path_1.join)(
            api?.paths?.absTmpPath ?? '/',
            tempVuePath,
          );
          api.writeTmpFile({
            path: tempVuePath,
            content: source,
          });
          debugger;
          globalThis.assetsCache.setCache(
            (0, buildVue_1.default)(absVuePath)
              .catch(err => {
                console.error(err);
              })
              .then(res => {
                return {
                  path: buildJsPath,
                  content: res,
                };
              }),
          );
          // 如果是 `<code>` 标签，则返回自定义的组件
          return {
            previewerProps: {
              sources: {
                _: { path: absVuePath },
              },
              // 该 demo 依赖的三方库
              dependencies: {},
            },
            // demo 渲染器的 props，会传递给上面注册的渲染器组件 即： previewer.js
            // rendererProps: { demoPath: '/vue/Foo/index.js' },
            rendererProps: {
              // ! 需要加 ‘/’ 修改
              demoPath: '/' + buildJsPath,
            },
          };
        },
      };
    },
  });
  api.chainWebpack(config => {
    config.resolve.alias.set('vue$', 'vue/dist/vue.esm.js');
    config
      .plugin('copy-process-assets-plugin')
      .use(additionalAssetsPlugin_1.default);
    return config;
  });
};
