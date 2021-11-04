"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _webpackSources() {
  const data = require("webpack-sources");

  _webpackSources = function _webpackSources() {
    return data;
  };

  return data;
}

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const resolveCahe = () => {
  // @ts-ignore
  const assetsCache = globalThis.assetsCache;
  const cacheList = assetsCache.getCache();
  assetsCache.clearCache();
  return new Promise((resolve, reject) => {
    Promise.all(cacheList).then(resolve).catch(reject);
  });
};

class CopyPlugin {
  apply(compiler) {
    // @ts-ignore
    compiler.hooks.thisCompilation.tap('copy-process-assets', compilation => {
      compilation.hooks.additionalAssets.tapAsync('copy-process-assets-plugin', /*#__PURE__*/function () {
        var _ref = _asyncToGenerator(function* (callback) {
          const assets = yield resolveCahe(); // @ts-ignore

          var _iterator = _createForOfIteratorHelper(assets),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              const asset = _step.value;
              compilation.assets[asset.path] = new (_webpackSources().RawSource)(asset.content);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          callback();
        });

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
    });
  }

}

var _default = CopyPlugin;
exports.default = _default;