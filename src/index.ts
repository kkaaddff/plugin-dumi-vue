// ref:
// - https://umijs.org/plugins/api
import { IApi } from '@umijs/types';
import { join, relative } from 'path';
import assetsCache from './cache';
import buildVue from './buildVue';
import CopyPlugin from './additionalAssetsPlugin';

export default (api: IApi) => {
  // 全局变量 缓存 vue 编译产物
  (globalThis as any).assetsCache = assetsCache;

  // 注册编译时
  api.register({
    key: 'dumi.registerCompiletime',
    fn: () => {
      return {
        // 编译时名称，唯一
        name: 'testregisterCompiletime',
        // demo 渲染组件
        component: join(__dirname, 'previewer.js'),
        // demo 语法树节点编译函数
        transformer: ({
          attrs, // code 标签的属性
          mdAbsPath, // 当前 Markdown 文件的路径
          node, // 语法树节点
        }: {
          attrs: any;
          mdAbsPath: any;
          node: any;
        }) => {
          const { source, lang } = node.properties;
          const vueRelativePath = relative(
            api?.paths?.absSrcPath ?? '/',
            mdAbsPath,
          ).replace(/\.md$/, '.vue');

          /**
           * 1.tempVuePath 相对路径
           * 在调用 umi 的 writeTmpFile 方法时，直接用相对路径即可
           */
          const tempVuePath = join('dumi', 'vue', vueRelativePath);
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
          const absVuePath = join(api?.paths?.absTmpPath ?? '/', tempVuePath);

          api.writeTmpFile({
            path: tempVuePath,
            content: source,
          });

          (globalThis as any).assetsCache.setCache(
            buildVue(absVuePath)
              .catch((err) => {
                console.error(err);
              })
              .then((res) => {
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

  api.chainWebpack((config) => {
    config.plugin('copy-process-assets-plugin').use(CopyPlugin);
    return config;
  });
};
