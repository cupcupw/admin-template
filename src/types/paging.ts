export type PagingParams<T = unknown> = {
  current: number
  length: number
} & T

export interface PagingResult<T = any> {
  count: number
  dataList: T[]
}
