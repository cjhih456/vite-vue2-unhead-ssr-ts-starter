import { LoginType } from "@/construct/LoginType"
import { StorageSymbol } from "@/plugins/StoragePlugin"

export default {
  setup() {
    const storage = inject(StorageSymbol)

    function loginWith(type: LoginType) {
      switch (type) {
        case LoginType.cookie:
          storage?.cookie.set('userData', 'Hello - Cookie!!')
          break
        case LoginType.local:
          storage?.local.set('userData', 'Hello - Local!!')
          break
        case LoginType.session:
          storage?.session.set('userData', 'Hello - Session!!')
          break
      }
    }
    return () => <div>
      <button onClick={() => loginWith(LoginType.cookie)}> login With Cookie</button>
      <button onClick={() => loginWith(LoginType.session)}> login With SessionStorage</button>
      <button onClick={() => loginWith(LoginType.local)}> login With LocalStorage</button>
    </div>
  }
}
