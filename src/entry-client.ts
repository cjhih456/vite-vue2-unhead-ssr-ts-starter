import main from './main'
import Cookies from 'vue-cookies'
import { Vueuse } from './utils/VueHelper'
Vueuse(Cookies)
const appContext = main()
appContext.router.onReady(() => {
  appContext.app.$mount('#app', true)
})

// @ts-ignore
window.appContext = appContext