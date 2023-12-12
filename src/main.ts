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
import { createPinia, PiniaVuePlugin } from 'pinia'
export const context = {} as VueContext
function createApp(req?: Request, res?: Response) {
  const router = createRouter(context)
  Vueuse(PiniaVuePlugin)
  Vueuse(AsyncDataPlugin, context)
  Vueuse(HeadPlugin, context)
  context.pinia = createPinia()
  context.storage = new Storage(req && res ? { req, res } : undefined)
  context.storage.cookie.setConfig({
    path: '/',
    expires: dayjs().add(1, 'day').toDate(),
    secure: true,
    signed: true,
  })
  const app = new Vue({
    router,
    pinia: context.pinia,
    provide: {
      [StorageSymbol as symbol]: context.storage,
      usehead: context.head
    },
    render: h => h(App)
  })
  context.app = app
  return context
}

export default createApp
