import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import alias from '@rollup/plugin-alias'; // Ensure this is imported
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import path from 'path';

// ES module-compatible way to emulate __dirname
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    alias({
      entries: [
        { find: '@', replacement: path.resolve(__dirname, 'src') }, // Alias for '@' to 'src'
      ],
    }),
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'], // Resolve .tsx files
    }),
    commonjs(),
    typescript(),
  ],
};
