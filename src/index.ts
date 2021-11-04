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

          const htmlRelativePath = relative(
            api?.paths?.absSrcPath ?? '/',
            mdAbsPath,
          ).replace(/\.md$/, '.html');

          const displayHtmlPath = join('dumi', 'vue', htmlRelativePath);

          const displayHtmlAbsPath = join(
            api?.paths?.absTmpPath ?? '/',
            displayHtmlPath,
          );

          api.writeTmpFile({
            path: displayHtmlPath,
            content: source,
          });

          api.writeTmpFile({
            path: displayHtmlPath.replace(/\.html$/, '.vue'),
            content: source,
          });

          (globalThis as any).assetsCache.setCache(
            buildVue(displayHtmlAbsPath.replace(/\.html$/, '.vue'))
              .catch(err => {
                console.error(err);
              })
              .then(res => {
                return {
                  path: displayHtmlPath
                    .replace(/\.html$/, '.js')
                    .replace('dumi/', ''),
                  content: res,
                };
              }),
          );

          // 如果是 `<code>` 标签，则返回自定义的组件
          return {
            previewerProps: {
              sources: {
                _: { path: displayHtmlAbsPath },
              },
              // 该 demo 依赖的三方库
              dependencies: {},
            },
            // demo 渲染器的 props，会传递给上面注册的渲染器组件 即： previewer.js
            // rendererProps: { demoPath: '/vue/Foo/index.js' },
            rendererProps: {
              demoPath: join(
                '/vue',
                htmlRelativePath.replace(/\.html$/, '.js'),
              ),
            },
          };
        },
      };
    },
  });

  api.chainWebpack(config => {
    config.resolve.alias.set('vue$', 'vue/dist/vue.esm.js');
    config.plugin('copy-process-assets-plugin').use(CopyPlugin);
    return config;
  });
};
