import { fetchData, useCustomFetch } from "@/composables/useCustomFetch"
import type { AccountInfo } from "@/models/entity/AccountInfo"
import { GetAccountInfo } from "@/models/response/account/GetAccountInfo"
import { Login } from "@/models/response/auth/Login"
import { plainToInstance } from "class-transformer"
import { acceptHMRUpdate, defineStore } from "pinia"
import { useStorageStore } from "./storage"

export const useAccountStore = defineStore('account', () => {
  const storage = useStorageStore()
  const data = shallowReactive({
    token: {
      token: '',
      refreshToken: ''
    },
    loginUserIdx: 0,
  })
  const userData = reactive({} as { [k: number]: AccountInfo })
  function login(id: string, pw: string) {
    return useCustomFetch('/user/login', fetchData('post', { id, pw })).then((result) => {
      const loginData = plainToInstance(Login, result)
      data.token = loginData
      storage.setCookie('token', loginData.token)
      storage.setCookie('refreshToken', loginData.refreshToken)
    })
  }
  function logout() {
    storage.deleteCookie('token')
    storage.deleteCookie('refreshToken')
    data.token = { token: '', refreshToken: '' }
    data.loginUserIdx = 0
  }

  function tokenRefresh() {
    return useCustomFetch('/user/refreshToken', fetchData('post', { refreshToken: data.token.refreshToken })).then((result) => {
      const loginData = plainToInstance(Login, result)
      data.token = loginData
      storage.setCookie('token', loginData.token)
      storage.setCookie('refreshToken', loginData.refreshToken)
      return true
    }).catch((e) => {
      return false
    })
  }
  function getUserInfo() {
    return useCustomFetch('/user/me', fetchData('get')).then((result: any) => {
      const userInfo = plainToInstance(GetAccountInfo, result)
      data.loginUserIdx = userInfo.userInfo.idx
      userData[userInfo.userInfo.idx] = userInfo.userInfo
    })
  }
  function updateUserInfo() { }

  return {
    data,
    userData,
    login,
    logout,
    tokenRefresh,
    getUserInfo,
    updateUserInfo,
  }
})

import.meta.hot?.accept(acceptHMRUpdate(useAccountStore, import.meta.hot))
