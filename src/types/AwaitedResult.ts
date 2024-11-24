export type AwaitedResult<T extends (...args: any[]) => Promise<any>> = Awaited<ReturnType<T>>
