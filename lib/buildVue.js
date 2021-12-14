'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const rollup_plugin_vue_1 = __importDefault(require('rollup-plugin-vue'));
const rollup = require('rollup');
async function buildVue(inputPath) {
  const buildConfig = {
    input: inputPath,
    plugins: [(0, rollup_plugin_vue_1.default)()],
  };
  const bundle = await rollup.rollup(buildConfig);
  // generate code and a sourcemap
  const { output } = await bundle.generate({ format: 'es' });
  const { code } = output[0] || { code: '' };
  return code;
}
exports.default = buildVue;
