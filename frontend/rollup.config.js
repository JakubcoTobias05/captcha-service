import path from 'path';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import url from 'rollup-plugin-url';
import pkg from './package.json';

export default {
  input: path.resolve(__dirname, 'src/widget.jsx'),
  output: [
    {
      file: pkg.browser, 
      format: 'umd',
      name: 'CaptchaWidget',
      globals: {
        react: 'React',
        'react-dom/client': 'ReactDOM'
      },
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      extensions: ['.js', '.jsx']
    }),
    commonjs(),
    babel({
      extensions: ['.js', '.jsx'],
      exclude: 'node_modules/**',
      babelHelpers: 'bundled'
    }),
    postcss(),
    url({
      include: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg', '**/*.webp'],
      limit: 0, 
      fileName: '[dirname][hash][extname]',
      destDir: path.resolve(__dirname, 'dist/assets')
    })
  ]
};
