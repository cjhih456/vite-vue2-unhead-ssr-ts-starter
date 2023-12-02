import { LoginType } from "@/construct/LoginType"
import { StorageSymbol } from "@/plugins/StoragePlugin"
import { inject } from "vue"

export default {
  setup() {
    const storage = inject(StorageSymbol)

    function loginWith(type: LoginType) {
      switch(type) {
        case LoginType.cookie: 
        storage?.cookie.set('loggedin', 'Hello - Cookie!!')
        break
        case LoginType.local: 
        storage?.cookie.set('loggedin', 'Hello - Local!!')
        break
        case LoginType.session: 
        storage?.cookie.set('loggedin', 'Hello - Session!!')
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
