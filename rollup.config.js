import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import license from 'rollup-plugin-license';

/** @type {Array<import('rollup').RollupOptions>} */
const config = [
  {
    input: './src/index.ts',
    output: {
      file: './dist/index.js',
      format: 'commonjs',
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
      }),
      terser(),
    ],
  },
  {
    input: './src/index.ts',
    output: {
      file: './dist/index.mjs',
      format: 'esm',
    },
    plugins: [typescript(), terser()],
  },
  {
    input: './src/iife.ts',
    output: {
      file: './dist/index.iife.js',
      format: 'iife',
      name: 'blurhashSW',
      extend: true,
    },
    plugins: [
      typescript(),
      nodeResolve(),
      commonjs(),
      license({
        banner: {
          content: {
            file: './src/banner.ejs',
          },
          commentStyle: 'ignored',
        },
        thirdParty: {
          allow: 'MIT',
        },
      }),
      terser(),
    ],
  },
];

export { config as default };
