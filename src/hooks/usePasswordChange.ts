import { doPasswordChange } from '@/api'
import {
  type ProDialogFormMetadata,
  useProDialogForm,
  type UseProDialogFormOptions,
} from '@/components'
import { passwordRule } from '@/utils'

export function usePasswordChange(options?: UseProDialogFormOptions) {
  return useProDialogForm(
    () => {
      const metadata: ProDialogFormMetadata = {
        password: {
          label: '旧密码',
          value: '',
          is: 'form-input',
          width: '100%',
          props: {
            type: 'password',
            showPassword: true,
            placeholder: '请填写旧密码',
          },
          rules: [{ required: true, message: '请填写旧密码' }],
        },
        newPassword: {
          label: '新密码',
          value: '',
          is: 'form-input',
          width: '100%',
          props: {
            type: 'password',
            showPassword: true,
            placeholder: '6-18位数字与字母的组合',
          },
          rules: [{ required: true, message: '请填写新密码' }, passwordRule],
        },
        confirmPassword: {
          label: '确认密码',
          value: '',
          is: 'form-input',
          width: '100%',
          props: {
            type: 'password',
            showPassword: true,
            placeholder: '请填写确认密码',
          },
          rules: [
            { required: true, message: '请填写确认密码' },
            {
              validator: (_, v) => {
                return metadata.newPassword.value === v
              },
              message: '两次密码输入不一致',
            },
          ],
        },
      }
      return metadata
    },
    async (metadata, instance) => {
      await instance.value.show({
        title: '修改密码',
        style: {
          maxWidth: '480px',
        },
        metadata,
        request: (params: any) => doPasswordChange(params),
      })
      ElMessage.success('操作成功，请使用新密码登录')
    },
    options,
  )
}
