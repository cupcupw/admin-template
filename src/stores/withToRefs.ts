import {
  type PiniaCustomStateProperties,
  type StoreGeneric,
  type StoreGetters,
  type StoreState,
  storeToRefs,
} from 'pinia'
import type { ComputedRef, Ref, ToRef, ToRefs } from 'vue'

type WithToRefsResult<T, P> = Omit<T, keyof P> & P

type StoreToRefs<SS extends StoreGeneric> = ToRefs<
  StoreState<SS> & PiniaCustomStateProperties<StoreState<SS>>
> &
  ToComputedRefs<StoreGetters<SS>>

type ToComputedRefs<T> = {
  [K in keyof T]: ToRef<T[K]> extends Ref<infer U> ? ComputedRef<U> : ToRef<T[K]>
}

//问题：请注意，store 是一个用 reactive 包装的对象，这意味着不需要在 getters 后面写 .value。就像 setup 中的 props 一样，我们不能对它进行解构：
//解决：结构保持响应 参考https://pinia.vuejs.org/zh/core-concepts/#using-the-store从 Store 解构

export function withToRefs<T extends (...args: any[]) => any>(fn: T) {
  function withToRefsCore(isTransform?: false, ...args: Parameters<T>): ReturnType<T>
  function withToRefsCore(
    isTransform: true,
    ...args: Parameters<T>
  ): WithToRefsResult<ReturnType<T>, StoreToRefs<ReturnType<T>>>
  function withToRefsCore(isTransform?: boolean, ...args: Parameters<T>) {
    const result = fn(...args)

    if (isTransform) {
      return Object.assign({}, result, storeToRefs(result))
    }

    return result
  }

  return withToRefsCore
}
