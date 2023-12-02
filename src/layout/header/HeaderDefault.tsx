import { StorageSymbol } from "@/plugins/StoragePlugin";
import { computed, defineComponent, inject } from "vue";
import { RouterLink } from "vue-router";

export default defineComponent({
  name: 'HeaderDefault',
  setup(props, {
    expose
  }) {
    const storage = inject(StorageSymbol)
    const userLoggedIn = computed(() => {
      return storage?.cookie.get('loggedin')
    })
    function logout() {
      storage?.cookie.delete('loggedin')
    }
    return () => <div>
      <RouterLink to={{name: 'Main'}} tag='button'>Goto Main</RouterLink>
      header!
      {
        userLoggedIn.value
          ? <button onClick={logout}>Logout</button>
          : <RouterLink to={{name: 'Login'}} tag="button">Goto Login</RouterLink>
      }
    </div>
  }
})