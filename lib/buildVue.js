"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildVue;

function _rollupPluginVue() {
  const data = _interopRequireDefault(require("rollup-plugin-vue"));

  _rollupPluginVue = function _rollupPluginVue() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const rollup = require('rollup');

function buildVue(_x) {
  return _buildVue.apply(this, arguments);
}

function _buildVue() {
  _buildVue = _asyncToGenerator(function* (inputPath) {
    const buildConfig = {
      input: inputPath,
      plugins: [(0, _rollupPluginVue().default)()]
    };
    const bundle = yield rollup.rollup(buildConfig); // generate code and a sourcemap

    const _yield$bundle$generat = yield bundle.generate({
      format: 'iife'
    }),
          output = _yield$bundle$generat.output;

    const _ref = output[0] || {
      code: ''
    },
          code = _ref.code;

    return code;
  });
  return _buildVue.apply(this, arguments);
}