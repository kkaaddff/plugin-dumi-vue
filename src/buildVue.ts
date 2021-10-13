import rollupVue from 'rollup-plugin-vue';
const rollup = require('rollup');

export default async function buildVue(inputPath: string) {
  const buildConfig = {
    input: inputPath,
    plugins: [rollupVue()],
  };
  const bundle = await rollup.rollup(buildConfig);

  // generate code and a sourcemap
  const { output } = await bundle.generate({ format: 'iife' });
  const { code } = output[0] || { code: '' };
  return code;
}
