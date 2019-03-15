import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import html from 'rollup-plugin-html';
import nodeResolve from 'rollup-plugin-node-resolve';
import { string } from 'rollup-plugin-string';
import { terser } from 'rollup-plugin-terser';

module.exports = {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    name: 'main'
  },
  external: [ 'Wifi', 'ws' ],
  plugins: [
    string({
      include: 'src/www/**/*.js',
    }),
    html({
      include: 'src/www/**/*.html',
      htmlMinifierOptions: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        collapseBooleanAttributes: true,
        conservativeCollapse: true,
        minifyJS: true
      },
    }),
    nodeResolve({
      jsnext: true,
      main: true,
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    terser(),
  ]
};
