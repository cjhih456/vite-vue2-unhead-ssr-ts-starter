import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'url'
import express from 'express'
import CookieParser from 'cookie-parser'

export async function createServer(
  isProd = process.env.NODE_ENV === 'production',
  hmrPort
) {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)

  const resolve = (p) => path.resolve(__dirname, p)

  const indexProd = isProd
    ? fs.readFileSync(resolve('../dist/index.html'), 'utf-8')
    : ''

  /**
   * @type { [k: string]: (null | string)[] | import('vite').ModuleNode }
   */
  const manifest = isProd
    // @ts-ignore
    ? (await import('../dist/ssr-manifest.json', { assert: { type: 'json' }})).default
    : {}

  const app = express()
  app.use(CookieParser())
  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite

  let render
  if (!isProd) {
    const ssr = await import('vite-plugin-ssr/plugin')
    vite = await (
      await import('vite')
    ).createServer({
      logLevel: 'info',
      server: {
        middlewareMode: true,
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100
        },
        hmr: {
          port: hmrPort
        }
      },
      plugins: [],
      appType: 'custom'
    })
    render = (await vite.ssrLoadModule('/entry-server.ts')).render
    if (!Object.keys(manifest).length) {
      const manifestIdToModule = {}
      vite.moduleGraph.idToModuleMap.forEach((module) => {
        if (!module.id) return
        manifestIdToModule[module.id] = module
      })
      Object.keys(manifestIdToModule).forEach((moduleId) => {
        manifest[moduleId] = Array.from(
          manifestIdToModule[moduleId].importedModules
        ).map((module) => module.id)
      })
    }
    app.use(vite.middlewares)
  } else {
    // @ts-ignore
    render = (await import('../dist-server/entry-server.js')).render
    app.use((await import('compression')).default())
    app.use(
      '/',
      await (await import('serve-static')).default(resolve('../dist'), {
        index: false
      })
    )
  }

  app.use('*', async(req, res) => {
    try {
      // always read fresh template in dev
      const url = req.originalUrl
      const template = isProd ? indexProd : fs.readFileSync(resolve('index.html'), 'utf-8')
      const templateHtml = isProd ? template : await vite.transformIndexHtml(url, template)
      const html = await render(templateHtml, url, manifest, req, res)
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite && vite.ssrFixStacktrace(e)
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  })

  return { app }
}

// @ts-ignore
createServer().then(({ app }) =>
  app.listen(8080, () => {
    console.log('http://localhost:8080')
  })
)
