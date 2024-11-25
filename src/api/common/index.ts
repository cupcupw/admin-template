import { curl } from '../curl'

export const doUserLogin = (data: { username: string; password: string }) =>
  curl<{ token: string }>('login', data, {
    method: 'POST',
    isStringify: true,
  })
