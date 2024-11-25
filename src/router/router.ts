import { createRouter, createWebHashHistory, type RouterOptions } from 'vue-router'

import { resetLoadAsyncFlag } from './asyncRoutes'
import common from './common'
import { setupGuards } from './guards'

const createRouterOptions = (): RouterOptions => ({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [...common],
})

export const router = createRouter(createRouterOptions())
;(window as any).router = router

// 设置路由守卫
setupGuards(router)

// 重置路由
// 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
export const resetRouter = () => {
  try {
    resetLoadAsyncFlag()
    // 先清空options 只有common的需要保留
    router.options.routes = [...common]
    // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
    router.getRoutes().forEach((route) => {
      const { name } = route
      //路由实例添加删除所有
      if (name && !['RootRoute'].includes(name as string)) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
    //路由实例添加common
    common.forEach(router.addRoute)
  } catch {
    // 报错 强制刷新浏览器
    window.location.reload()
  }
}
