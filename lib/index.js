"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _path() {
  const data = require("path");

  _path = function _path() {
    return data;
  };

  return data;
}

var _cache = _interopRequireDefault(require("./cache"));

var _buildVue = _interopRequireDefault(require("./buildVue"));

var _additionalAssetsPlugin = _interopRequireDefault(require("./additionalAssetsPlugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ref:
// - https://umijs.org/plugins/api
var _default = api => {
  // 全局变量 缓存 vue 编译产物
  globalThis.assetsCache = _cache.default; // 注册编译时

  api.register({
    key: 'dumi.registerCompiletime',
    fn: () => {
      return {
        // 编译时名称，唯一
        name: 'testregisterCompiletime',
        // demo 渲染组件
        component: (0, _path().join)(__dirname, 'previewer.js'),
        // demo 语法树节点编译函数
        transformer: ({
          attrs,
          // code 标签的属性
          mdAbsPath,
          // 当前 Markdown 文件的路径
          node // 语法树节点

        }) => {
          var _api$paths$absSrcPath, _api$paths, _api$paths$absTmpPath, _api$paths2;

          const _node$properties = node.properties,
                source = _node$properties.source,
                lang = _node$properties.lang;
          const htmlRelativePath = (0, _path().relative)((_api$paths$absSrcPath = api === null || api === void 0 ? void 0 : (_api$paths = api.paths) === null || _api$paths === void 0 ? void 0 : _api$paths.absSrcPath) !== null && _api$paths$absSrcPath !== void 0 ? _api$paths$absSrcPath : '/', mdAbsPath).replace(/\.md$/, '.html');
          const displayHtmlPath = (0, _path().join)('dumi', 'vue', htmlRelativePath);
          const displayHtmlAbsPath = (0, _path().join)((_api$paths$absTmpPath = api === null || api === void 0 ? void 0 : (_api$paths2 = api.paths) === null || _api$paths2 === void 0 ? void 0 : _api$paths2.absTmpPath) !== null && _api$paths$absTmpPath !== void 0 ? _api$paths$absTmpPath : '/', displayHtmlPath);
          api.writeTmpFile({
            path: displayHtmlPath,
            content: source
          });
          api.writeTmpFile({
            path: displayHtmlPath.replace(/\.html$/, '.vue'),
            content: source
          });
          globalThis.assetsCache.setCache((0, _buildVue.default)(displayHtmlAbsPath.replace(/\.html$/, '.vue')).catch(err => {
            console.error(err);
          }).then(res => {
            return {
              path: displayHtmlPath.replace(/\.html$/, '.js').replace('dumi/', ''),
              content: res
            };
          })); // 如果是 `<code>` 标签，则返回自定义的组件

          return {
            previewerProps: {
              sources: {
                _: {
                  path: displayHtmlAbsPath
                }
              },
              // 该 demo 依赖的三方库
              dependencies: {}
            },
            // demo 渲染器的 props，会传递给上面注册的渲染器组件 即： previewer.js
            // rendererProps: { demoPath: '/vue/Foo/index.js' },
            rendererProps: {
              demoPath: (0, _path().join)('/vue', htmlRelativePath.replace(/\.html$/, '.js'))
            }
          };
        }
      };
    }
  });
  api.chainWebpack(config => {
    config.resolve.alias.set('vue$', 'vue/dist/vue.esm.js');
    config.plugin('copy-process-assets-plugin').use(_additionalAssetsPlugin.default);
    return config;
  });
};

exports.default = _default;