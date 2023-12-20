import 'pinia'
import type Storage from "@/plugins/StoragePlugin"
import type { CookieStorage } from '@/plugins/StoragePlugin'
declare module 'pinia' {
  export interface PiniaCustomProperties {
    $storage: Storage
  }
}
export const useStorageStore = defineStore('storage', {
  actions: {
    setCookie(k: string, v: string) {
      this.$storage.cookie.set(k, v)
    },
    deleteCookie(k: string) {
      this.$storage.cookie.delete(k)
    }
  },
  getters: {
    getCookie(): (k: string) => string {
      return (k: string) => {
        return this.$storage.cookie.get(k)
      }
    }
  }
})
import.meta.hot?.accept(acceptHMRUpdate(useStorageStore, import.meta.hot))
