import Vue from 'vue'
import App from './App'
import { Vueuse } from './utils/VueHelper'
import type { VueContext } from 'types/VueContext'
import createRouter from './router'
import HeadPlugin from '@/plugins/head'
export const context = {} as VueContext
function createApp() {
  const router = createRouter(context)
  Vueuse(HeadPlugin, context)
  const app = new Vue({
    router,
    provide: {
      usehead: context.head
    },
    render: h => h(App)
  })
  context.app = app
  return context
}

export default createApp
