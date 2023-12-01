import type { VueConstructor } from 'vue'

export interface VueContext {
  router: import('vue-router').default
  app: import('vue').default
  head: import('@unhead/vue').VueHeadClient
  // axios: import('axios').AxiosInstance
}
