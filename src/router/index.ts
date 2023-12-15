import { useAccountStore } from '@/store/account'
import { Vueuse } from '@/utils/VueHelper'
import type { VueContext } from 'types/VueContext'
import Router from 'vue-router'
import GuestOnly from './guards/GuestOnly'

const routerContext: { router?: Router } = {
  router: undefined
}

function createRouter(context: VueContext) {
  Vueuse(Router)
  const router = routerContext.router = context.router = new Router({
    mode: 'history',
    base: '/',
    routes: [
      { name: 'Main', path: '/', component: () => import('@/pages/index') },
      { name: 'Login', path: '/login', component: () => import('@/pages/login') },
      { path: '*', redirect() { return { name: 'Main', replace: true } } }
    ]
  })
  router.beforeEach(async (to, from, next) => {
    if (!from.name || from.name === null) {
      const accountStore = useAccountStore()
      const tokenBuffer = {
        token: context.storage.cookie.get('token'),
        refreshToken: context.storage.cookie.get('refreshToken')
      }
      accountStore.data.token = tokenBuffer
      if (accountStore.data.token.token) {
        await accountStore.getUserInfo()
      }
    }
    if (to.name === 'Login')
      GuestOnly(to, from, next, context)
    else {
      next()
    }
  })
  return router
}

export function useRouter() {
  return routerContext.router
}

export function useRoute() {
  return routerContext.router?.currentRoute
}

export default createRouter
