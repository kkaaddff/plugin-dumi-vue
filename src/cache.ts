/**
 * 缓存 构建 vue SFC promise
 */

class AssetsCache {
  #cacheList:Promise<{path: string; content: string}>[] = [];
  
  setCache = (prom: Promise<{ path: string; content: string; }>) => {
    this.#cacheList.push(prom);
  };

  getCache = () => {
    return this.#cacheList.slice();
  };
  
  clearCache = () => {
    this.#cacheList = [];
  };
}

export default new AssetsCache();
