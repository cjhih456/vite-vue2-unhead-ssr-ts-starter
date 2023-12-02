import { Vueuse } from '@/utils/VueHelper'
import type { VueContext } from 'types/VueContext'
import Router from 'vue-router'

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
  return router
}

export function useRouter() {
  return routerContext.router
}

export function useRoute() {
  return routerContext.router?.currentRoute
}

export default createRouter
