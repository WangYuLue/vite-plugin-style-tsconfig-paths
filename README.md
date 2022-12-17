# vite-plugin-style-tsconfig-paths

> A Vite plugin to resolve paths from tsconfig.json in style imports(less, sass, scss, stylus, css)

## Install

```bash
# npm
npm i vite-plugin-style-tsconfig-paths -D

# yarn
yarn add vite-plugin-style-tsconfig-paths -D

# pnpm
pnpm add vite-plugin-style-tsconfig-paths -D
```

## Usage

import the plugin in your `vite.config.js`

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { styleTsconfigPaths } from 'vite-plugin-style-tsconfig-paths'

export default defineConfig({
  plugins: [react(), styleTsconfigPaths()]
})
```

config alias in tsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@styles/*": ["src/styles/*"]
    }
  }
}
```

import in style file

```less
// src/styles/color.less
@vite-blue:rgba (28, 71, 212, 0.7);
```

```less
// src/App.less
@import '@styles/color.less';

.theme-color {
  color: @vite-blue;
}
```

## tips

### only handle alias start with `@`

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@styles/*": ["src/styles/*"], // work
      "styles/*": ["src/styles/*"] // not work
    }
  }
}
```

### this plugin will ingore style file in `node_modules`
