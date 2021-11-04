import { RawSource } from 'webpack-sources';
import { Compiler } from 'webpack';

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
  apply(compiler: Compiler) {
    // @ts-ignore
    compiler.hooks.thisCompilation.tap('copy-process-assets', compilation => {
      compilation.hooks.additionalAssets.tapAsync(
        'copy-process-assets-plugin',
        async (callback: () => void) => {
          const assets = await resolveCahe();
          // @ts-ignore
          for (const asset of assets) {
            compilation.assets[asset.path] = new RawSource(asset.content);
          }
          callback();
        },
      );
    });
  }
}

export default CopyPlugin;
