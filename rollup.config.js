// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/event-schedule.cjs.js',
      format: 'cjs'
    },
    {
      file: 'dist/event-schedule.esm.js',
      format: 'es'
    },
    {
      file: 'dist/event-schedule.umd.js',
      format: 'umd',
      name: 'EventSchedule',
      exports: 'named'
    }
  ],
  plugins: [
    typescript(),
    postcss({
      extract: 'dist/event-schedule.css',
      minimize: true,
      sourceMap: true
    }),
    serve({
      open: true,
      contentBase: ['dist', 'public', 'assets'],
      port: 8080,
    }),
    livereload('dist'),
  ]
};