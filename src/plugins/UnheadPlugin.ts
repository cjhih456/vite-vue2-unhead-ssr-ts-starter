import { createHead, createServerHead } from '@unhead/vue'
import type { VueConstructor } from 'vue'
import { UnheadPlugin } from '@unhead/vue/vue2'
import type { VueContext } from 'types/VueContext'

export default {
  install(Vue: VueConstructor, options: VueContext) {
    UnheadPlugin(Vue)
    const headFunc = import.meta.env.SSR ? createServerHead : createHead
    const head = headFunc()
    Vue.prototype.unhead = options.head = head
  }
}

