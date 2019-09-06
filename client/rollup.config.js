const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');

module.exports = {
  input: './src/js/main.js',
  output: {
    file: './dist/js/bundle.js',
    format: 'iife',
    globals: { ethers: 'ethers' }
  },
  plugins: [
		resolve({
      browser: true,
    }),
    commonjs(),
		babel({
			exclude: 'node_modules/**' // only transpile our source code
		})
  ],
  external: ['ethers']
};