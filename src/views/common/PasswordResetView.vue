<template>
  <div class="password-reset-wrap">
    <div class="header">
      <ElButton link @click="$router.push('/login')">
        <ProIcon name="icon-fanhui" style="margin-right: 6px" />
        返回登录
      </ElButton>
    </div>
    <div class="form-content">
      <h2>重置密码</h2>

      <PasswordResetSuccess v-if="result"></PasswordResetSuccess>

      <ElForm
        v-else
        label-position="top"
        size="large"
        ref="formInstance"
        :model="objForm"
        :rules="objFormRules"
        @keydown.enter.prevent="handleSubmit"
        @submit="handleSubmit"
      >
        <ElFormItem prop="cellphone">
          <ElInput
            v-model="objForm.cellphone"
            prefix-icon="Cellphone"
            :disabled="loading"
            clearable
            placeholder="请输入手机号"
            maxlength="11"
          />
        </ElFormItem>
        <ElFormItem prop="verificationCode">
          <ElInput
            v-model="objForm.verificationCode"
            type="text"
            prefix-icon="ScaleToOriginal"
            :disabled="loading"
            clearable
            placeholder="请填写验证码"
            maxlength="6"
          >
            <template #append>
              <ElButton
                type="primary"
                :disabled="count > 0"
                :loading="smsLoading"
                @click="handleSmsCode"
              >
                {{ count > 0 ? `再次获取(${count}s)` : '获取验证码' }}
              </ElButton>
            </template>
          </ElInput>
        </ElFormItem>
        <ElFormItem v-if="accountList.length" prop="username">
          <ElSelect
            v-model="objForm.username"
            :disabled="loading"
            clearable
            placeholder="请选择账号"
          >
            <template #prefix>
              <ElIcon> <User /> </ElIcon>
            </template>
            <ElOption
              v-for="(item, index) in accountList"
              :key="index"
              :value="item"
              :label="item"
            />
          </ElSelect>
        </ElFormItem>
        <ElFormItem prop="password">
          <ElInput
            v-model="objForm.password"
            type="password"
            prefix-icon="Lock"
            :disabled="loading"
            clearable
            placeholder="6-18位数字与字母的组合"
            show-password
            maxlength="18"
          />
        </ElFormItem>
        <ElFormItem prop="confirmPassword">
          <ElInput
            v-model="objForm.confirmPassword"
            type="password"
            prefix-icon="Lock"
            :disabled="loading"
            clearable
            placeholder="请再次输入新密码"
            autocomplete="new-password"
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
            提 交
          </ElButton>
        </ElFormItem>
      </ElForm>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useAsyncTask, useCountDown } from '@daysnap/vue-use'

  // import { doPasswordReset, doSmsCodeSend } from '@/api'
  import { useForm } from '@/hooks'
  import { getTestAccountInfo, passwordRule, phoneRule } from '@/utils'

  import PasswordResetSuccess from './components/PasswordResetSuccess.vue'

  const result = ref(false)

  const { cellphone = '' } = getTestAccountInfo()

  // 表单
  const [formInstance, objForm, objFormRules] = useForm(
    {
      cellphone,
      verificationCode: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    {
      cellphone: [{ required: true, message: '请输入手机号' }, phoneRule],
      verificationCode: [{ required: true, message: '请输入验证码' }],
      username: [{ required: true, message: '请选择账号' }],
      password: [{ required: true, message: '6-18位数字与字母的组合' }, passwordRule],
      confirmPassword: [
        { required: true, message: '请再次输入新密码' },
        {
          validator: ((_: any, v: string) => {
            return objForm.password === v
          }) as any,
          message: '两次密码输入不一致',
        },
      ],
    },
  )

  const [count, countDown] = useCountDown(60)
  const accountList = ref<string[]>([])

  const { trigger: handleSmsCode, loading: smsLoading } = useAsyncTask(
    async () => {
      await formInstance.value.validateField('cellphone').throw()
      // const { appid: captchaAppId, ticket, randstr } = await captcha()
      // const { cellphone } = objForm
      // accountList.value = await doSmsCodeSend({
      //   cellphone,
      //   captchaAppId,
      //   ticket,
      //   randstr,
      //   type: '2',
      // })
      // if (!accountList.value.includes(objForm.username)) {
      //   objForm.username = ''
      // }
      // // 如果只有一个账号，自动填充
      // if (accountList.value.length === 1 && !objForm.username) {
      //   objForm.username = accountList.value[0]
      // }
      // ElMessage.success(`获取验证码成功`)
      // countDown()
    },
    {
      throwError: true,
    },
  )

  const { loading, trigger: handleSubmit } = useAsyncTask(
    async () => {
      await formInstance.value.validate().throw()
      if (!objForm.username) {
        throw '请先获取验证码'
      }
      // await doPasswordReset(objForm)
      result.value = true
    },
    {
      throwError: true,
    },
  )
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/define.scss';
  .password-reset-wrap {
    .header {
      width: j(432);
    }
    :deep {
      .el-input-group__append {
        .el-button {
          background-color: var(--el-button-bg-color);
          border-color: var(--el-button-border-color);
          color: var(--el-button-text-color);
          &.is-disabled,
          &.is-disabled:hover {
            background-color: var(--el-button-disabled-bg-color);
            background-image: none;
            border-color: var(--el-button-disabled-border-color);
            color: var(--el-button-disabled-text-color);
            cursor: not-allowed;
          }
        }
      }
    }
  }
</style>
