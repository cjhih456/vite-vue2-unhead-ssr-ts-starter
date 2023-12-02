import { defineComponent, inject } from "vue";
import { RouterView } from "vue-router";
import { HeaderKey, provideHeader } from '@/plugins/LayoutHeaderPlugin'
import DefaultLayout from "./layout/DefaultLayout";
import { useHead } from "@unhead/vue";


export default defineComponent({
  setup() {
    useHead({
      title: 'Vite vue unhead ssr ts starter',
      meta: [
        {"http-equiv": 'x-ua-compatible'},
        {charset: 'utf-8'},
      ]
    })
    provideHeader()
    return () => <div>
      <DefaultLayout>
        <RouterView></RouterView>
      </DefaultLayout>
    </div>
  }
})