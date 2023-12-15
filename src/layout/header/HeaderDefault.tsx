import { useAccountStore } from "@/store/account";

export default defineComponent({
  name: 'HeaderDefault',
  setup() {
    const accountStore = useAccountStore()
    const userLoggedIn = computed(() => {
      return !!accountStore.data.loginUserIdx
    })
    function logout() {
      accountStore.logout()
    }
    return () => <VAppBar app absolute elevate-on-scroll>
      <VBtn to={{ name: 'Main' }} icon>
        <VIcon>home</VIcon>
      </VBtn>
      <VSpacer />
      {
        !userLoggedIn.value
          ? <VBtn to={{ name: 'Login' }} rounded large>Goto Login</VBtn>
          : <VBtn onClick={logout}>Logout</VBtn>
      }
    </VAppBar>
  }
})