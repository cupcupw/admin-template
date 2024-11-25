<template>
  <div class="dashboard-wrap">
    <img src="@/assets/img/img-auth.png" alt="figure" />
    <div class="dashboard-content">
      <h2>{{ metadata.title }}</h2>
      <p>欢迎使用</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { metadata } from '@/metadata'
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/define.scss';
  .dashboard-wrap {
    @extend %df;
    @extend %jcc;
    padding: j(32);
    img {
      @extend %w100;
      @extend %h100;
      max-width: j(1130 * 0.5);
      max-height: j(1030 * 0.5);
    }
  }
  .dashboard-content {
    width: j(576);
    padding: j(48);
    h2 {
      color: #1d2129;
      font-size: j(48);
    }
    p {
      @extend %c6;
      font-size: j(28);
      margin-top: j(10);
    }
  }
</style>
