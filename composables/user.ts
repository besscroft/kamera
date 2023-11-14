import { acceptHMRUpdate, defineStore } from 'pinia'
import type { UserStore } from '~/types/userStore'

export const useUserStore = defineStore('user', {
  state: (): UserStore => ({
    // token
    token: '',
    // token 前缀
    tokenName: '',
  }),
  actions: {
    /** 设置 token */
    setToken(token: string) {
      this.token = token
    },
    /** 设置 token 前缀 */
    setTokenName(tokenName: string) {
      this.tokenName = tokenName
    },
  },
  persist: true,
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
