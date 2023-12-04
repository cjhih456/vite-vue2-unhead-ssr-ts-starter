import { HeaderKey } from "@/plugins/LayoutHeaderPlugin";
import { computed, defineComponent, inject } from "vue";

export default defineComponent({
  name: "DefaultLayout",
  setup(_props, {slots}) {
    const header = inject(HeaderKey)
    return () => {
      const HeaderComponent = header?.getHeaderComponent()
      return <div class="layout">
      {HeaderComponent ? <HeaderComponent/> : undefined}
      {slots.default ? slots.default() : undefined}
    </div>
    }
  }
})