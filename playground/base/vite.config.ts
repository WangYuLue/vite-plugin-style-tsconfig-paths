import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { styleTsconfigPaths } from 'vite-plugin-style-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), styleTsconfigPaths()]
})
