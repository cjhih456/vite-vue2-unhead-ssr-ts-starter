import type { VueConstructor } from 'vue'

export interface VueContext {
  Vue: VueConstructor
  router: import('vue-router').default
  app: import('vue').default
  // axios: import('axios').AxiosInstance
}
