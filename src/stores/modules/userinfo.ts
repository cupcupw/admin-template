import { useState } from '@daysnap/vue-use'
import { defineStore } from 'pinia'

import { doUserLogout } from '@/api'
import { resetRouter, router } from '@/router'
import type { Userinfo } from '@/types'
import { createNamespace } from '@/utils'

import { withOut } from '../withOut'

export const useUserinfoStore = withOut(
  defineStore(
    createNamespace('USER_INFO'),
    () => {
      const [userinfo, setUserinfo] = useState<Userinfo>()

      //登出
      const logout = () => {
        //告诉后台 token 置为失效
        doUserLogout().null()
        //pinia更新 userinfo为空
        setUserinfo(void 0)
        // 路由清空只保留common
        resetRouter()
        // 退回到登录页
        router.replace('/login')
      }

      return { userinfo, setUserinfo, logout }
    },
    {
      persist: true,
    },
  ),
)
