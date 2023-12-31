import { useAccountStore } from '@/store/account'
import { ofetch, type FetchOptions } from 'ofetch'

type ApiMethod = 'get' | 'head' | 'patch' | 'post' | 'put' | 'delete' | 'connect' | 'options' | 'trace'

export const fetchData = function (
  method: ApiMethod,
  data?: { [key: string]: any }
): FetchOptions<'json'> & { method: ApiMethod } {
  if (data) {
    const values = Object.values(data)
    if (method === 'get') {
      const dataBuffer = {} as { [key: string]: any }
      Object.keys(data).forEach((v) => {
        if (
          typeof data[v] === 'boolean' ||
          typeof data[v] === 'string' ||
          typeof data[v] === 'object' ||
          Array.isArray(data[v]) ||
          typeof data[v] === 'number'
        ) {
          dataBuffer[v] = data[v]
        }
      })
      return {
        method,
        params: dataBuffer
      }
    } else if (method === 'post') {
      if (values.findIndex(v => v instanceof Blob || v instanceof File) === -1) {
        return {
          method,
          body: JSON.stringify(data)
        }
      }
      const formData = new FormData()
      Object.keys(data).forEach((v) => {
        formData.append(v, data[v])
      })
      return {
        method,
        body: formData
      }
    }
  }
  return {
    method,
  }
}

interface CustomFetch<T> {
  fetch: Promise<T>
  tokenRefreshNeed: boolean
}

function customFetch<T>(url: string, options?: FetchOptions<'json'> & { method: ApiMethod }) {
  const accountStore = useAccountStore()
  // const authStore = useAuthStore()
  const ctx = {
    // @ts-ignore
    fetch: ofetch<T>(url, {
      ...options,
      keepalive: true,
      baseURL: import.meta.env.VUE_APP_API_HOST,
      cache: 'no-cache',
      // eslint-disable-next-line require-await
      // async onResponse() {
      //   // { request, response, options }
      //   console.log('[fetch response]')
      // },
      // eslint-disable-next-line require-await
      async onResponseError({ response }) {
        // {  }
        if (
          response.status === 403 ||
          (response.status === 400 &&
            response._data.code === accountStore.data.token.token)
        ) {
          ctx.tokenRefreshNeed = await accountStore.tokenRefresh()
        }
      },
      // eslint-disable-next-line require-await
      async onRequest({ options }) {
        const token = accountStore.data.token.token
        if (token) {
          options.headers = options.headers
            ? {
              ...options.headers,
              authorization: `Beerer ${token}` || ''
            }
            : {
              authorization: `Beerer ${token}` || ''
            }
        }
      }
      // eslint-disable-next-line require-await
      // async onRequestError() {
      //   { request, options, error }
      //   console.log('[fetch request error]')
      // },
    }),
    tokenRefreshNeed: false
  } as CustomFetch<T>
  return ctx
}

export function useCustomFetch<T>(url: string, options?: FetchOptions<'json'> & { method: ApiMethod }) {
  const ctx = customFetch<T>(url, options)
  return ctx.fetch.catch(async () => {
    if (ctx.tokenRefreshNeed) {
      const ctxRetry = await customFetch<T>(url, options)
      return ctxRetry.fetch
    }
    return ctx.fetch
  })

  // await ctx.execute()
  // if (ctx.error && tokenRefreshNeed) {
  //   await ctx.refresh()
  // }
  // if (ctx.error && ctx.error.value) {
  //   throw ctx.error.value
  // }
  // return ctx.data.value
}
