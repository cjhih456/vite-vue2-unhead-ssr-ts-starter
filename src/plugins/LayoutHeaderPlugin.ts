import HeaderDefault from '@/layout/header/HeaderDefault'
import type { Ref } from 'vue'
export const HeaderKey = 'headerKey'
export interface LayoutHeaderType {
  headerName: Ref<string>,
  getHeaderComponent(): typeof HeaderDefault | undefined,
  changer(): void
  changer(value: string): void
}

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

