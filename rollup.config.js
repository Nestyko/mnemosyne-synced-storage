import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import typescript from '@rollup/plugin-typescript'
import jsonPlugin from '@rollup/plugin-json'

const plugins = [
  peerDepsExternal(),
  resolve(),
  commonjs(),
  jsonPlugin(),
  typescript({
    tsconfig: './tsconfig.json',
  }),
]

const indexFiles = [
  './src/index.ts',
  './src/react/index.ts',
  './src/adapters/index.ts',
]

const config = indexFiles.map(inputFilePath => ({
  input: inputFilePath,
  output: [
    {
      file: inputFilePath.replace('src', 'lib').replace('ts', 'js'),
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: inputFilePath
        .replace('src', 'lib')
        .replace('index', 'index.es')
        .replace('ts', 'js'),
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins,
}))

// eslint-disable-next-line import/no-anonymous-default-export
export default config
