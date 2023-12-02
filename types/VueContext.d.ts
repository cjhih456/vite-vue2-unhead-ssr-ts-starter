import type Storage from '@/plugins/StoragePlugin'
import type { VueConstructor } from 'vue'

export interface VueContext {
  router: import('vue-router').default
  app: import('vue').default
  head: import('@unhead/vue').VueHeadClient
  storage: Storage
  // axios: import('axios').AxiosInstance
}
