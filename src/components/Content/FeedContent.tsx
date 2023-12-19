import { useContentStore } from "@/store/content"

export default defineComponent({
  name: 'FeedContent',
  props: {
    idx: {
      type: Number,
      default: 0,
    }
  },
  setup(props) {
    const contentStore = useContentStore()
    const contentInfo = computed(() => contentStore.contentData[props.idx] || {})
    return () => <VCard>
      <VCardTitle>
        <VListItem>
          <VListItemAvatar>
            <VImg src={contentInfo.value.writer.thumb}></VImg>
          </VListItemAvatar>
          <VListItemContent>
            <VListItemTitle >{contentInfo.value.writer.id}</VListItemTitle>
          </VListItemContent>
        </VListItem>
      </VCardTitle>
      <VCardText>
        {contentInfo.value.content}
      </VCardText>
    </VCard>
  }
})