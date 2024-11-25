<template>
  <div class="login-wrap">
    <h1>{{ metadata.title }}</h1>
    <div class="form-content">
      <h2>欢迎登录</h2>
      <ElForm
        label-position="top"
        size="large"
        ref="formInstance"
        :model="form"
        :rules="formRules"
        @keydown.enter.prevent="handleSubmit"
        @submit="handleSubmit"
      >
        <ElFormItem prop="username">
          <ElInput
            v-model="form.username"
            prefix-icon="User"
            :disabled="loading"
            clearable
            placeholder="请输入用户名"
          />
        </ElFormItem>
        <ElFormItem prop="password">
          <ElInput
            v-model="form.password"
            type="password"
            prefix-icon="Lock"
            :disabled="loading"
            autocomplete="new-password"
            clearable
            placeholder="请输入您的密码"
            show-password
          />
        </ElFormItem>
        <ElFormItem>
          <ElButton
            class="form-button"
            block
            type="primary"
            :loading="loading"
            @click="handleSubmit"
          >
            登 录
          </ElButton>
        </ElFormItem>
        <ElFormItem>
          <ElButton link @click="$router.push('/password-reset')">忘记密码</ElButton>
        </ElFormItem>
      </ElForm>
    </div>

    <ProDialogForm ref="proDialogFormInstance" />
  </div>
</template>

<script setup lang="ts">
  import { useAsyncTask } from '@daysnap/vue-use'

  import { doUserLogin } from '@/api'
  import { useForm, usePasswordChange } from '@/hooks'
  import { metadata } from '@/metadata'
  import { useUserinfoStore } from '@/stores'
  import { getTestAccountInfo } from '@/utils'

  //配置测试账号
  const { username = '', password = '' } = getTestAccountInfo()

  // 表单
  const [formInstance, form, formRules] = useForm(
    {
      username,
      password,
    },
    {
      username: [{ required: true, message: '请输入用户名' }],
      password: [{ required: true, message: '请输入您的密码' }],
    },
  )

  const router = useRouter()
  const { setUserinfo } = useUserinfoStore()

  // 修改密码
  const [proDialogFormInstance, handlePasswordChange] = usePasswordChange({
    onGenerate: (metadata, data) => {
      metadata.password.props = { disabled: true, type: 'password' }
      metadata.token = { value: data.token }
    },
    onSuccess: (metadata) => {
      //修改完登出
      // doUserLogout({ token: metadata.token.value })
      router.replace('/login')
    },
  })

  // 登录
  const { loading, trigger: handleSubmit } = useAsyncTask(
    async () => {
      //验证
      await formInstance.value.validate().throw()

      const { username, password } = form
      //登录
      const userinfo = await doUserLogin({ ...form })
      // 如果密码是初始密码 需要强制要求修改密码
      if (password === 'whbtest') {
        await ElMessageBox.confirm(`为了您的账号安全，首次登录请修改密码！`, '提示')
        await handlePasswordChange({ password, ...userinfo })
      } else {
        setUserinfo({ username, ...userinfo })
        router.replace('/')
        ElMessage.success(`登录成功`)
      }
    },
    {
      throwError: true,
    },
  )
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/define.scss';
  .login-wrap {
    h1 {
      color: #1d2129;
      font-size: j(24);
    }
  }
</style>
