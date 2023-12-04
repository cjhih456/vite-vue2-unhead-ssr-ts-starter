import type { CookieOptions, Request, Response } from "express"
import _ from "lodash"
import Vue, { type InjectionKey } from "vue"

type CookieMergedOptions = CookieOptions & { sameSite?: string }
type CookieStorage = {
  _req?: Request
  _res?: Response
  defaultConfig?: CookieMergedOptions
  get(k: string): string
  set(k: string, v: string, o?: CookieMergedOptions): void
  delete(k: string, o?: CookieMergedOptions): void
  setConfig(o?: CookieMergedOptions): void
}
type VueStorage = {
  cookie: CookieStorage
}

export default class Storage {
  constructor(cookie?: { req: Request, res: Response }) {
    this.cookie._req = cookie?.req
    this.cookie._res = cookie?.res
  }
  cookie = {
    _req: undefined,
    _res: undefined,
    defaultConfig: undefined,
    setConfig(options) {
      this.defaultConfig = options
    },
    get(k) {
      if (import.meta.env.SSR) {
        // // @ts-ignore
        // const signedCookies = this._req.signedCookies || {} as any
        // @ts-ignore
        const cookies = this._req.cookies
        return _.toString(cookies[k]) as string
      } else {
        return _.toString(Vue.$cookies.get(k))
      }
    },
    set(k, v, o) {
      const options = _.assign({}, this.defaultConfig, o)
      if (import.meta.env.SSR) {
        this._res?.cookie(k, v, options)
      } else {
        Vue.$cookies.set(k, v, options?.expires, options?.path, options?.domain, options?.secure, options?.sameSite)
      }
    },
    delete(k, o) {
      const options = _.assign({}, this.defaultConfig, o)
      if (import.meta.env.SSR) {
        this._res?.clearCookie(k, options)
      } else {
        Vue.$cookies.remove(k, options?.path, options?.domain)
      }
    }
  } as CookieStorage
}
export const StorageSymbol = Symbol() as InjectionKey<Storage>

declare module 'vue/types/vue' {
  interface VueConstructor {
    storage: VueStorage
  }

  interface Vue {
    $storage: VueStorage
  }
}
