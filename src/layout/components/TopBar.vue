<template>
  <div class="top-bar">
    <div class="logo-box">
      <img src="@/assets/img/logo.png" alt="logo" />
      <span>{{ metadata.title }}</span>
    </div>

    <UserBox />
  </div>
</template>

<script setup lang="ts">
  import { metadata } from '@/metadata'

  import UserBox from './UserBox.vue'
</script>

<style lang="scss" scoped>
  @import '@/layout/styles/define.scss';
  .top-bar {
    @extend %df;
    @extend %aic;
    height: var(--ly-topbar-height);
    background-color: #252b27;
    padding: 0 j(16);
  }
  .logo-box {
    @extend %df;
    @extend %aic;
    margin-right: auto;
    img {
      width: j(48);
      height: j(48);
    }
    span {
      margin-left: j(16);
      padding-left: j(16);
      line-height: 1;
      border-left: 1px solid rgba(224, 227, 231, 0.32);
      font-weight: 500;
      color: rgba(255, 255, 255, 0.86);
      font-size: j(16);
    }
  }
</style>
