import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

const name = 'GabiJS'

export default {
  input: 'src/index.js',
  output: {
    file: `dist/gabi.js`,
    format: 'iife',
    name
  },
  plugins: [
    resolve(),
    babel({
        exclude: 'node_modules/**',
    })
  ]
};
