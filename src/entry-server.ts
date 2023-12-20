import { renderSSRHead } from '@unhead/ssr'
import { createRenderer } from 'vue-server-renderer'
import createApp from './main'
import type { ModuleNode } from 'vite'
import _ from 'lodash'
import type { Request, Response } from 'express'
import devalue from '@nuxt/devalue'

interface MainfestObj {
  [k: string]: Array<ModuleNode>
}

export async function render(tempHtml: string, url: string, manifest: MainfestObj, req: Request, res: Response) {
  const renderer = createRenderer({
    // @ts-ignore
    manifest,
    template: tempHtml.replace('<div id="app"></div>', '<!--vue-ssr-outlet-->')
  })
  const context = createApp(req, res)
  // set the router to the desired URL before rendering
  context.router.push(url).catch((e: Error) => { })

  return new Promise((resolve) => {
    context.router.onReady(async () => {
      const ctx = {} as any
      renderer.renderToString(context.app, ctx, async (err, html) => {
        if (err) {
          return resolve(err.stack)
        }
        const storeData = devalue(context.pinia.state.value)
        const header = await renderSSRHead(context.head)
        header.bodyTags = (header.bodyTags ?? '') + `<script>window.__piniaData=${storeData}</script>`
        const template = _.template(html)
        resolve(template({ ...header, preloadLinks: renderPreloadLinks(ctx.modules, manifest) }))
      })
    })
  })
}

function renderPreloadLinks(modules: Set<string>, manifest: MainfestObj) {
  let links = ''
  const seen = new Set()
  const files = manifest[`${process.cwd()}/src/entry-client.ts`]
  modules.forEach((id) => {
    if (files) {
      files.forEach((file) => {
        if (!seen.has(file)) {
          seen.add(file)
          links += renderPreloadLink(file)
        }
      })
    }
  })
  return links
}

function renderPreloadLink(fileName: ModuleNode) {
  const file = String(fileName)
  if (/\.(j|t)sx?$/.test(file) || file.endsWith('.vue')) {
    return `<link rel="modulepreload" crossorigin href="${file}">`
  } else if (file.endsWith('.css')) {
    return `<link rel="stylesheet" href="${file}">`
  } else if (file.endsWith('.woff')) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`
  } else if (file.endsWith('.woff2')) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`
  } else if (file.endsWith('.gif')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/gif">`
  } else if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`
  } else if (file.endsWith('.png')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/png">`
  } else {
    // TODO
    return ''
  }
}
