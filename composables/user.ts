import { acceptHMRUpdate, defineStore } from 'pinia'
import type { UserStore } from '~/types/userStore'

export const useUserStore = defineStore('user', {
  state: (): UserStore => ({
    // token
    token: '',
    // token 前缀
    tokenName: '',
    // 用户名称
    userName: '',
    // 头像
    avatar: '',
    // 角色 Code
    roleCode: '',
    // 邮箱
    email: '',
  }),
  actions: {
    /** 设置用户名称 */
    setUserName(name: string) {
      this.userName = name
    },
    /** 设置 token */
    setToken(token: string) {
      this.token = token
    },
    /** 设置 token 前缀 */
    setTokenName(tokenName: string) {
      this.tokenName = tokenName
    },
    /** 设置头像 */
    setAvatar(avatar: string) {
      this.avatar = avatar
    },
    /** 设置角色 Code */
    setRoleCode(roleCode: string) {
      this.roleCode = roleCode
    },
    /** 设置邮箱 */
    setEmail(email: string) {
      this.email = email
    }
  },
  persist: true,
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
