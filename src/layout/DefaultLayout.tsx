import { HeaderKey } from "@/plugins/LayoutHeaderPlugin";

export default defineComponent({
  name: "DefaultLayout",
  setup(_props, { slots }) {
    const header = inject(HeaderKey)
    return () => {
      const HeaderComponent = header?.getHeaderComponent()
      return <VApp class="layout">
        {HeaderComponent ? <HeaderComponent /> : undefined}
        <VMain>
          <VContainer>
            {slots.default ? slots.default() : undefined}
          </VContainer>
        </VMain>
      </VApp>
    }
  }
})