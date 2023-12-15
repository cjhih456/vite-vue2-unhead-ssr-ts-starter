import Storage, { StorageSymbol } from "@/plugins/StoragePlugin"
import { useRouter } from "@/router"
import { useAccountStore } from "@/store/account"
import ClientOnly from "@/utils/ClientOnly"
export default defineComponent({
  name: 'LoginPage',
  setup() {
    const accountStore = useAccountStore()
    const router = useRouter()
    const form = shallowRef()
    // const
    const data = reactive({
      id: '',
      pw: '',
      formValid: false
    })
    function loginEvent(e: Event) {
      e.preventDefault()
      e.stopPropagation()
      form.value.validate()
      if (data.formValid) {
        accountStore.login(data.id, data.pw).then(() => {
          accountStore.getUserInfo().then(() => {
            router?.push({ name: 'Main' })
          })
        })
      }
    }
    return {
      data,
      loginEvent,
      form
    }
  },
  render() {
    return <div>
      <VCard class="pa-3">
        <ClientOnly>
          <VForm ref='form' v-model={this.data.formValid} onSubmit={this.loginEvent}>
            <VTextField v-model={this.data.id} outlined label="ID"></VTextField>
            <VTextField v-model={this.data.pw} outlined label="PW"></VTextField>
            <VBtn type='submit' block color="primary">Login</VBtn>
          </VForm>
        </ClientOnly>
      </VCard>
    </div>
  }
})
