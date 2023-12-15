import { useAccountStore } from "@/store/account";
import type { VueContext } from "types/VueContext";
import type { NavigationGuardNext, Route } from "vue-router";

export default async function GuestOnly(to: Route, from: Route, next: NavigationGuardNext, context: VueContext) {
  const accountStore = useAccountStore()
  if (!accountStore.data.token.token) {
    context.storage.cookie.get('token')
  }
  if (accountStore.data.token.token) {
    if (!accountStore.data.loginUserIdx) {
      await accountStore.getUserInfo()
    }
  }

  return next(accountStore.data.loginUserIdx ? { name: 'Main', replace: true } : undefined)
}