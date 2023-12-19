import { fetchData, useCustomFetch } from "@/composables/useCustomFetch"
import type { FeedContent, FeedContentWithAcount } from "@/models/entity/FeedContent"
import { GetContent } from "@/models/response/content/GetContent"
import { GetContentList } from "@/models/response/content/GetContentList"
import { plainToInstance } from "class-transformer"

export const useContentStore = defineStore('content', () => {
  const contentData = reactive({} as { [k: number]: FeedContentWithAcount })
  function loadContentList(offset: number, pageSize: number) {
    return useCustomFetch('/contents', fetchData('get', { offset, pageSize })).then((result) => {
      const contentList = plainToInstance(GetContentList, result)
      contentList.validateObj()
      if (contentList.isValidatedObj) {
        return {
          content: contentList.content.map(v => {
            contentData[v.idx] = v
            return v.idx
          }),
          page: contentList.page
        }
      } else {
        console.log(contentList.formErrors, contentList)
        return { content: [], page: { offset: 0, pageSize } }
      }
    })
  }
  function loadContentDetail(idx: number) {
    return useCustomFetch(`/contents/${idx}`, fetchData('get')).then((result) => {
      const contentData = plainToInstance(GetContent, result)

    })
  }
  return {
    contentData,
    loadContentList
  }
})

import.meta.hot?.accept(acceptHMRUpdate(useContentStore, import.meta.hot))
