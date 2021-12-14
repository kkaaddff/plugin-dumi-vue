'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const webpack_sources_1 = require('webpack-sources');
const resolveCahe = () => {
  // @ts-ignore
  const { assetsCache } = globalThis;
  const cacheList = assetsCache.getCache();
  assetsCache.clearCache();
  return new Promise((resolve, reject) => {
    Promise.all(cacheList)
      .then(resolve)
      .catch(reject);
  });
};
class CopyPlugin {
  apply(compiler) {
    // @ts-ignore
    compiler.hooks.thisCompilation.tap('copy-process-assets', compilation => {
      compilation.hooks.additionalAssets.tapAsync(
        'copy-process-assets-plugin',
        async callback => {
          const assets = await resolveCahe();
          // @ts-ignore
          for (const asset of assets) {
            compilation.assets[asset.path] = new webpack_sources_1.RawSource(
              asset.content,
            );
          }
          callback();
        },
      );
    });
  }
}
exports.default = CopyPlugin;
