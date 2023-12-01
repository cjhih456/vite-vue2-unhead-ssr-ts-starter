import { HeaderKey } from "@/plugins/header";
import { defineComponent, inject, reactive } from "vue";

export default defineComponent({
  name: 'MainPage',
  setup() {
    const header = inject(HeaderKey)
    function changeHeader() {
      if(!header) return
      header.changer(header.headerName.value === 'default' ? 'no-header' : 'default')
    }
    const cnt = reactive({

    })
    return () => <div>
      <button onClick={changeHeader}>change header</button>
    </div>
  }
})