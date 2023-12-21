import { useAccountStore } from '@/store/account'
import { promiseLinker } from '@/utils/global'
import { Vueuse } from '@/utils/VueHelper'
import type { VueContext } from 'types/VueContext'
import Router, { type NavigationGuardNext, type RawLocation, type Route } from 'vue-router'
import GuestOnly from './guards/GuestOnly'

const routerContext: { router?: Router } = {
  router: undefined
}
type MiddlewareResultType = RawLocation | false | void
export type MiddlewareNext = (value?: MiddlewareResultType | undefined) => void
export type MiddlewareType = (to: Route, from: Route, next: MiddlewareNext, context: VueContext) => Promise<any>
declare module 'vue-router' {
  interface RouteMeta {
    middleware?: MiddlewareType[]
  }
}
function createRouter(context: VueContext) {
  Vueuse(Router)
  const router = routerContext.router = context.router = new Router({
    mode: 'history',
    base: '/',
    routes: [
      { name: 'Main', path: '/', component: () => import('@/pages/index'), meta: { middleware: [] } },
      { name: 'Login', path: '/login', component: () => import('@/pages/login'), meta: { middleware: [GuestOnly] } },
      { path: '*', redirect() { return { name: 'Main', replace: true } } }
    ]
  })
  router.beforeEach(async (to, from, next) => {
    if (!from.name || from.name === null) {
      const accountStore = useAccountStore()
      if (!accountStore.data.token.token && context.storage.cookie.get('token')) {
        const tokenBuffer = {
          token: context.storage.cookie.get('token'),
          refreshToken: context.storage.cookie.get('refreshToken')
        }
        accountStore.data.token = tokenBuffer
      }
      if (accountStore.data.token.token && (!accountStore.data.loginUserIdx || !accountStore.userData[accountStore.data.loginUserIdx])) {
        await accountStore.getUserInfo()
      }
    }
    promiseLinker<MiddlewareResultType>((to.meta?.middleware ?? []).map(v => {
      return (resolve, reject, beforeObj) => {
        if (typeof beforeObj === 'undefined' || (typeof beforeObj === 'boolean' && beforeObj !== false)) {
          v(to, from, resolve, context)
        } else {
          resolve(beforeObj)
        }
      }
    })).then((result) => {
      next(result)
    }).catch((e) => {
      console.log(e)
      next({ name: 'Main', replace: true })
    })
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
