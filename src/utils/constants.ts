// 是否是开发环境
export const __DEV__ = process.env.NODE_ENV === 'development'

// 项目名称
export const NAME = 'admin'

// 获取测试账号
export const getTestAccountInfo = () => {
  if (__DEV__) {
    return {
      cellphone: '',
      username: '',
      password: '',
    }
  }
  return {}
}
