import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import typescript from '@rollup/plugin-typescript'
import image from '@rollup/plugin-image'
import del from 'rollup-plugin-delete'
import jsonPlugin from '@rollup/plugin-json'

import packageJson from './package.json'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  input: './src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    del({ targets: ['lib/*'] }),
    image(),
    peerDepsExternal(),
    resolve(),
    commonjs(),
    jsonPlugin(),
    typescript({
      tsconfig: './tsconfig.json',
    }),
  ],
}
