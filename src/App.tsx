import { defineComponent, inject } from "vue";
import { RouterView } from "vue-router";
import { HeaderKey, provideHeader } from '@/plugins/header'
import DefaultLayout from "./layout/DefaultLayout";

export default defineComponent({
  setup() {
    provideHeader()
    return () => <div>
      <DefaultLayout>
        <RouterView></RouterView>
      </DefaultLayout>
    </div>
  }
})