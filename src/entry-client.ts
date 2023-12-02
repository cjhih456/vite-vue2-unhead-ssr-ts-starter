import main from './main'
import Cookies from 'vue-cookies'
import { Vueuse } from './utils/VueHelper'
Vueuse(Cookies)
const appContext = main()
appContext.app.$mount('#app')
