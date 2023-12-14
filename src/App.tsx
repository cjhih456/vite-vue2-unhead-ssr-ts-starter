import { HeaderKey, type LayoutHeaderType } from "@/plugins/LayoutHeaderPlugin";
import DefaultLayout from "./layout/DefaultLayout";
import { useHead } from "@unhead/vue";
import '@/styles/app.sass'
export default defineComponent({
  setup() {
    useHead({
      title: 'Vite vue unhead ssr ts starter',
      meta: [
        { "http-equiv": 'x-ua-compatible' },
        { charset: 'utf-8' },
      ],
      link: [
        {
          key: 'google-fonts',
          rel: 'preload stylesheet',
          as: 'style',
          href:
            'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,600,700,900|Noto Sans KR:100,300,400,500,600,700,900|Noto Sans JP:100,300,400,500,600,700,900|Noto Sans TC:100,300,400,500,600,700,900|Material+Icons'
        },
      ]
    })
    const header = inject<LayoutHeaderType>(HeaderKey)
    const HeaderComponent = header?.getHeaderComponent()
    return () => <VApp id='app'>
      {HeaderComponent ? <HeaderComponent /> : undefined}
      <DefaultLayout>
        <RouterView></RouterView>
      </DefaultLayout>
    </VApp>
  }
})