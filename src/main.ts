import 'reflect-metadata'
import Vue from 'vue'
import App from './App'
import { Vueuse } from './utils/VueHelper'
import type { VueContext } from 'types/VueContext'
import createRouter from './router'
import HeadPlugin from '@/plugins/UnheadPlugin'
import AsyncDataPlugin from './plugins/AsyncDataPlugin'
import type { Request, Response } from 'express'
import Storage, { StorageSymbol } from './plugins/StoragePlugin'
import dayjs from 'dayjs'
import createVuetifyPlugin from './plugins/VuetifyPlugin'
import { provideHeader } from './plugins/LayoutHeaderPlugin'
import createPiniaStore from './store'

export const context = {} as VueContext
function createApp(req?: Request, res?: Response) {
  const vuetify = createVuetifyPlugin()
  Vueuse(AsyncDataPlugin, context)
  Vueuse(HeadPlugin, context)
  context.storage = new Storage(req && res ? { req, res } : undefined)
  context.storage.cookie.setConfig({
    path: '/',
    expires: dayjs().add(1, 'day').toDate(),
    secure: true,
    signed: true,
  })
  createPiniaStore(context)
  const router = createRouter(context)
  const app = new Vue({
    router,
    // @ts-ignore
    vuetify: vuetify,
    pinia: context.pinia,
    provide: {
      [StorageSymbol]: context.storage,
      usehead: context.head
    },
    setup() {
      provideHeader()
    },
    render: h => h(App)
  })
  context.app = app
  return context
}

export default createApp
