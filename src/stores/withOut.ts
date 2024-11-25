import { isBoolean } from '@daysnap/utils'

import { pinia } from './pinia'

// 问题在组件外使用pinia
// 解决 需要将pinia实例传给 useNameStore()
// https://pinia.vuejs.org/zh/ssr/#using-the-store-outside-of-setup
export function withOut<T extends (...args: any[]) => any>(fn: T) {
  return ((...args: any[]) => {
    // fix 修正 与 withToRefs 嵌套使用的问题
    // 有 true 需要将boolean传给withToRefs
    // 如conat useOther = withOut( withToRefs( defineStore(Name, init) ) )
    // useOther(true)
    let index = args.findIndex((item) => isBoolean(item))
    return fn(args[++index] ?? pinia, ...args.slice(++index))
  }) as T
}
