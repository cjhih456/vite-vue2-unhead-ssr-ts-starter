import { Vueuse } from '@/utils/VueHelper'
import Vuetify from 'vuetify'
export default function createVuetifyPlugin() {
  const vuetifyTheme = new Vuetify()
  Vueuse(Vuetify)
  return vuetifyTheme
}