import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import license from 'rollup-plugin-license';
import { terser } from 'rollup-plugin-terser';

/** @type {Array<import('rollup').RollupOptions>} */
const config = [
  {
    input: './src/index.ts',
    output: {
      file: './dist/index.cjs',
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
    input: './src/index.ts',
    output: {
      extend: true,
      file: './dist/index.js',
      format: 'iife',
      name: 'self',
    },
    plugins: [
      typescript(),
      nodeResolve(),
      commonjs(),
      license({
        banner: {
          commentStyle: 'ignored',
          content: {
            file: './src/banner.ejs',
          },
        },
        thirdParty: {
          allow: 'MIT',
          output: './dist/licenses.txt',
        },
      }),
      terser(),
    ],
  },
];

export { config as default };
