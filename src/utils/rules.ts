import { isPhone } from '@daysnap/utils'
import type { FormItemRule } from 'element-plus'

export const phoneRule: FormItemRule = {
  validator: (_, v) => (v ? isPhone(v) : true),
  message: '手机号输入有误',
}

export const passwordRule: FormItemRule = {
  max: 18,
  min: 6,
  message: `6-18位数字与字母的组合`,
  pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/,
}
