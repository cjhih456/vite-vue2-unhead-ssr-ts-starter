import { Vueuse } from "@/utils/VueHelper"
import { PiniaVuePlugin } from "pinia"
import type { VueContext } from "types/VueContext"
import { useAccountStore } from "./account"
import { useContentStore } from "./content"
import { useStorageStore } from "./storage"

export default function createPiniaStore(context: VueContext) {
  Vueuse(PiniaVuePlugin)
  context.pinia = createPinia()
  context.pinia.use(({ store, pinia }) => {
    store.$storage = context.storage
    if (!import.meta.env.SSR) {
      try {
        // @ts-ignore
        pinia.state.value = structuredClone(window.__piniaData)
      } catch (e) {
        // @ts-ignore
        pinia.state.value = window.__piniaData
      }
    }
  })
  useStorageStore(context.pinia)
  useAccountStore(context.pinia)
  useContentStore(context.pinia)
}
