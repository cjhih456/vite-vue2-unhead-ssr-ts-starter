import Vue from 'vue'
import App from './App'
import { createHead, createServerHead } from '@unhead/vue'
import { Vueuse } from './utils/VueHelper'
import type { VueContext } from 'types/VueContext'
const context: Partial<VueContext> = {

}
function createApp() {
  const createHeadFuc = import.meta.env.SSR ? createServerHead : createHead
  const head = createHeadFuc()
  const app = new Vue({
    render: h => h(App)
  })
  context.app = app
  Vueuse(head)
  return { ...(context as VueContext), head }
}

export { context }

export default createApp
