import { StorageSymbol } from "@/plugins/StoragePlugin";

export default defineComponent({
  name: 'HeaderDefault',
  setup() {
    const storage = inject(StorageSymbol)
    const userLoggedIn = computed(() => {
      return storage?.cookie.get('loggedin')
    })
    function logout() {
      storage?.cookie.delete('loggedin')
    }
    return () => <VNavigationDrawer app>
      <RouterLink to={{ name: 'Main' }}>Goto Main</RouterLink>
      header!
      {
        userLoggedIn.value
          ? <button onClick={logout}>Logout</button>
          : <RouterLink to={{ name: 'Login' }}>Goto Login</RouterLink>
      }
    </VNavigationDrawer>
  }
})