import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts'
  },
  format: ['esm', 'cjs'],
  external: ['esbuild', 'postcss', 'tsconfck', 'vite'],
  outDir: 'dist',
  dts: true,
  clean: true
})
