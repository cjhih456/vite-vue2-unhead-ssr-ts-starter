import { HeaderKey } from "@/plugins/header";
import { computed, defineComponent, inject } from "vue";

export default defineComponent({
  name: "DefaultLayout",
  setup(props, {slots}) {
    const header = inject(HeaderKey)
    const emptryFunc = () => undefined

    return () => {
      const HeaderComponent = header?.getHeaderComponent()
      return <div class="layout">
      {HeaderComponent ? <HeaderComponent/> : undefined}
      {slots.default ? slots.default() : undefined}
    </div>
    }
  }
})