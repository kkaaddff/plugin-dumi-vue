'use strict';
/**
 * 缓存 构建 vue SFC promise
 */
Object.defineProperty(exports, '__esModule', { value: true });
class AssetsCache {
  #cacheList = [];
  setCache = (prom) => {
    this.#cacheList.push(prom);
  };
  getCache = () => {
    return this.#cacheList.slice();
  };
  clearCache = () => {
    this.#cacheList = [];
  };
}
exports.default = new AssetsCache();
