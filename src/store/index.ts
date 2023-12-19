import { Vueuse } from "@/utils/VueHelper"
import { PiniaVuePlugin } from "pinia"
import type { VueContext } from "types/VueContext"
import { useAccountStore } from "./account"
import { useContentStore } from "./content"
import { useStorageStore } from "./storage"

export default function createPiniaStore(context: VueContext) {
  Vueuse(PiniaVuePlugin)
  context.pinia = createPinia()
  context.pinia.use(({ store }) => {
    store.$storage = context.storage
  })
  useStorageStore(context.pinia)
  useAccountStore(context.pinia)
  useContentStore(context.pinia)
}