import main from './main'
import Cookies from 'vue-cookies'
import { Vueuse } from './utils/VueHelper'
Vueuse(Cookies)
const appContext = main()
const staticPath = location.href.replace(location.origin, '')
appContext.router.push(staticPath).finally(() => {
  appContext.app.$mount('#app', true)
})

// @ts-ignore
window.appContext = appContext