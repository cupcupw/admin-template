import type { RouteRecordRaw } from 'vue-router'

import { usePermissionStore } from '@/stores/modules/permission'

import { router } from './router'
import { routes } from './routes'

//路由默认只有login 重置密码 和仪表台
//这里做动态路由 没有权限直接吧 路由表删除掉 这样通过页面路由直接访问就访问不到了

//是否已经获取过路由表 路由拦截器根据这个判断是否还要重新执行获取
export let isLoadAsyncRoutesFlag = false

// 暴漏方法 重置路由拦截器 获取路由
export const resetLoadAsyncFlag = () => (isLoadAsyncRoutesFlag = false)

export const loadAsyncRoutes = async () => {
  const { has, updatePermissions } = usePermissionStore(true)
  //更新权限
  await updatePermissions()
  const loop = (routes: RouteRecordRaw[]) => {
    //全部routes拷贝一份
    return routes
      .map((item) => ({ ...item }))
      .filter((route) => {
        const { meta = {}, children } = route

        if (children) {
          //嵌套路由 递归
          route.children = loop(children)
          if (!route.children.length) {
            return false
          }
          //大路由的子路由 取第一个子路由为path
          route.redirect = route.children[0].path
        }
        // 拿到路由配置的权限
        const { pd } = meta
        if (pd) {
          // 根据权限返回路由表
          return has(pd)
        }
        return true
      })
  }

  const data = loop(routes)
  if (data.length) {
    //有路由的话 仪表台路由就没有用了
    //没有的话就显示仪表台给他
    router.removeRoute('RootRoute')
    //第一个就是他的首页
    data.push({
      path: '/',
      hidden: true,
      name: 'RootRoute',
      redirect: data[0].path,
    })
    //router 实例 的options这里也要删除一下
    router.options.routes = router.options.routes.filter((item) => item.path !== '/')
  }
  //更新路由
  data.forEach((item) => router.addRoute(item))
  router.options.routes = [...router.options.routes, ...data]
  // 动态路由已获取
  isLoadAsyncRoutesFlag = true
}
