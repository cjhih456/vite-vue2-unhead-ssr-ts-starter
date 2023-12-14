import { Vueuse } from '@/utils/VueHelper'
// @ts-ignore
import Vuetify from 'vuetify/lib'
export default function createVuetifyPlugin() {
  Vueuse(Vuetify, {
    components: {
      VApp,
      VAppBar,
      VAppBarNavIcon,
      VMain,
      VContainer,
      VBadge,
      VBtn,
      VForm,
      VTextField,
      VTextarea,
      VIcon,
      VSpacer,
      VCard,
      VRow,
      VCol
    }
  })
  const vuetifyTheme = new Vuetify({
    theme: {}
  }) as Vuetify
  return vuetifyTheme
}