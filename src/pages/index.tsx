import FeedContent from "@/components/Content/FeedContent";
import { HeaderKey, type LayoutHeaderType } from "@/plugins/LayoutHeaderPlugin";
import { useContentStore } from "@/store/content";

export default defineComponent({
  name: 'MainPage',
  setup() {
    const header = inject<LayoutHeaderType>(HeaderKey)
    const contentStore = useContentStore()

    const contents = reactive({
      list: [] as number[],
      pageSize: 15,
      hasEnd: false
    })
    onMounted(() => {
      contentStore.loadContentList(contents.list.length, contents.pageSize).then((result) => {
        contents.hasEnd = !result.content.length
        !contents.hasEnd && (contents.list = contents.list.concat(result.content))
      })
    })
    return () => <div>
      {contents.list.map(idx => <FeedContent idx={idx}></FeedContent>)}
    </div>
  }
})