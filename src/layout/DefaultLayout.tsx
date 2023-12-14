
export default defineComponent({
  name: "DefaultLayout",
  setup(_props, { slots }) {
    return () => {
      return <VMain>
        <VContainer fluid>
          {slots.default ? slots.default() : undefined}
        </VContainer>
      </VMain>
    }
  }
})