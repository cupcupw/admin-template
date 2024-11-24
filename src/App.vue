<template>
  <ElConfigProvider :locale="zhCn">
    <RouterView />
  </ElConfigProvider>
</template>

<script setup lang="ts">
  import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>

<style lang="scss">
  @import '@/assets/scss/global.scss';
  body {
    min-width: var(--ly-min-width);
    background-color: var(--da-body-background-color);
  }

  .c-py {
    padding: 16px 0;
  }

  .c-px {
    padding: 0 16px;
  }
  .c-header {
    @extend %df;
    @extend %aic;
    @extend %jcs;
    @extend %bsb;
    min-height: 48px;
    margin: 0 16px 16px;
    padding: 8px 20px;
    background: var(--el-fill-color-light);
    font-size: 14px;
  }
  .c-link-button {
    .el-button.is-link {
      font-size: 12px;
      padding-left: 0;
      padding-right: 0;
    }
  }
</style>
