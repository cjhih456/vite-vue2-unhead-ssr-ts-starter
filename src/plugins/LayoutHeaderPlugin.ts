import HeaderDefault from '@/layout/header/HeaderDefault'
import { provide, ref, type DefineComponent, type Ref } from 'vue'
import type { InjectionKey } from 'vue'
export const HeaderKey = Symbol() as InjectionKey<{
  headerName: Ref<string>,
  getHeaderComponent(): typeof HeaderDefault | undefined,
  changer(): void
  changer(value: string): void
}>

export function provideHeader() {

  const headerName = ref('default')
  provide(HeaderKey, {
    headerName,
    getHeaderComponent() {
      switch (headerName.value) {
        case 'default':
          return HeaderDefault
        case 'no-header':
        default:
          return undefined
      }
    },
    changer(value?: string) {
      if (typeof value !== 'string') { return headerName.value }
      headerName.value = value
    }
  })
}
// app.use(head)
