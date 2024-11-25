<template>
  <ElDropdown class="user-box" trigger="hover">
    <div class="user-content">
      <ElIcon>
        <User />
      </ElIcon>
      <!-- <span>{{ userinfo?.username }}</span> -->
      <span>whb</span>
      <ElIcon>
        <!-- <CaretBottom /> -->
      </ElIcon>
    </div>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem @click="handlePasswordChange">修改密码</ElDropdownItem>
        <ElDropdownItem divided @click="handleExit">安全退出</ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>

  <ProDialogForm ref="proDialogFormInstance" />
</template>

<script setup lang="ts">
  import { usePasswordChange } from '@/hooks'
  import { useUserinfoStore } from '@/stores'

  const { userinfo, logout } = useUserinfoStore()

  // 修改密码
  const [proDialogFormInstance, handlePasswordChange] = usePasswordChange({
    onSuccess: () => {
      logout()
    },
  })

  // 退出账号
  const handleExit = async () => {
    await ElMessageBox.confirm(`确认是否退出该账号？`)
    logout()
    ElMessage.success(`退出成功`)
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/define.scss';
  .user-content {
    @extend %df;
    @extend %aic;
    @extend %cp;
    @extend %cfff;
    outline: none;
    font-size: 14px;
    span {
      @extend %twno;
      max-width: j(100);
      margin: 0 j(5);
    }
    img {
      width: 32px;
      height: 32px;
      margin-right: 5px;
    }
  }
</style>
