import Storage, { StorageSymbol } from "@/plugins/StoragePlugin";

export default defineComponent({
  name: 'HeaderDefault',
  setup() {
    const storage = inject<Storage>(StorageSymbol)
    const userLoggedIn = computed(() => {
      return storage?.cookie.get('userData')
    })
    function logout() {
      storage?.cookie.delete('userData')
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