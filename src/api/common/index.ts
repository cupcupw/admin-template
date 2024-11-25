import { curl } from '../curl'

export const doUserLogin = (data: { username: string; password: string }) =>
  curl<{ token: string }>('login', data, {
    method: 'POST',
    isStringify: true,
  })

export const doPasswordChange = (data: {
  password: string
  newPassword: string
  confirmPassword: string
  token?: string
}) =>
  curl(`passwordChange`, data, {
    method: 'POST',
    isStringify: true,
  })

export const doUserLogout = () =>
  curl(
    `userLogout`,
    {},
    {
      method: 'POST',
      isStringify: true,
    },
  )
