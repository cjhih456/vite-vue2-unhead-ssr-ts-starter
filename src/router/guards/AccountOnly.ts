import { useAccountStore } from "@/store/account";
import type { VueContext } from "types/VueContext";
import type { NavigationGuardNext, Route } from "vue-router";
import type { MiddlewareNext } from "..";

export default async function NeedLogin(to: Route, from: Route, next: MiddlewareNext, context: VueContext) {
  const accountStore = useAccountStore()
  if (!accountStore.data.token.token) {
    context.storage.cookie.get('token')
  }
  if (accountStore.data.token.token) {
    if (!accountStore.data.loginUserIdx) {
      await accountStore.getUserInfo()
    }
  }
  return next(!accountStore.data.loginUserIdx ? { name: 'Login', replace: true } : undefined)
}