import { defineConfig, normalizePath } from 'vite'
import { isCSSRequest } from 'vite'
import { parse } from 'tsconfck'
import { get, entries, forEach } from 'lodash'
import postcss from 'postcss'

const excludePath = [/\/node_modules\//]

const vitePluginStyleTsconfigPaths = async () => {
  let tsconfckRes
  try {
    tsconfckRes = await parse('tsconfig.json')
  } catch (e) {
    console.warn(
      `[vite-plugin-style-tsconfig-paths]: tsconfig.json parse error, cause: ${String(
        e
      )}`
    )
  }

  const paths: Record<string, string[]> = get(
    tsconfckRes,
    'tsconfig.compilerOptions.paths',
    {}
  )

  const handledPaths: {
    find: string
    replacement: string
  }[] = []

  forEach(entries(paths), ([alias, paths]) => {
    // only handle alias start with @
    if (alias.startsWith('@') && paths?.[0]) {
      handledPaths.push({
        find: alias.replace(/\*$/, ''),
        replacement: paths[0].replace(/\*$/, '')
      })
    }
  })

  return {
    name: 'vite-plugin-style-tsconfig-paths',
    enforce: 'pre' as 'pre', // handle ts check
    transform(code: string, id: string) {
      let _code = code
      const _id = normalizePath(id)
      if (isCSSRequest(_id)) {
        if (excludePath.some((path) => path.test(_id))) {
          return
        }
        postcss.parse(code).walkAtRules('import', (rule) => {
          const { params } = rule
          if (params.startsWith('"') && params.endsWith('"')) {
            const path = params.slice(1, -1)
            handledPaths.forEach(({ find, replacement }) => {
              if (path.startsWith(find)) {
                _code = _code.replace(
                  params,
                  `"${path.replace(find, replacement)}"`
                )
              }
            })
          }
        })
        // replace by RegExp
        // forEach(handledPaths, ({ find, replacement }) => {
        //   const reg = new RegExp(find, "g");
        //   _code = _code.replace(reg, replacement);
        // });
        return _code
      }
    }
  }
}

export { vitePluginStyleTsconfigPaths as styleTsconfigPaths }
