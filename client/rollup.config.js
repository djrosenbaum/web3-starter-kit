const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');

module.exports = {
  input: './src/js/main.js',
  output: {
    file: './dist/js/bundle.js',
    format: 'iife'
  },
  plugins: [
		resolve({
      browser: true,
    }),
		babel({
			exclude: 'node_modules/**' // only transpile our source code
		})
  ]
};