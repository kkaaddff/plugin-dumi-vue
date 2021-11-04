"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }

var _cacheList = /*#__PURE__*/_classPrivateFieldLooseKey("cacheList");

/**
 * 缓存 构建 vue SFC promise
 */
class AssetsCache {
  constructor() {
    Object.defineProperty(this, _cacheList, {
      writable: true,
      value: []
    });

    this.setCache = prom => {
      _classPrivateFieldLooseBase(this, _cacheList)[_cacheList].push(prom);
    };

    this.getCache = () => {
      return _classPrivateFieldLooseBase(this, _cacheList)[_cacheList].slice();
    };

    this.clearCache = () => {
      _classPrivateFieldLooseBase(this, _cacheList)[_cacheList] = [];
    };
  }

}

var _default = new AssetsCache();

exports.default = _default;