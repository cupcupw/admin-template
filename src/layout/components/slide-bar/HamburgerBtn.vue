<template>
  <ElIcon class="hamburger-btn" size="18" @click="toggle">
    <Expand v-if="collapse" />
    <Fold v-else />
  </ElIcon>
</template>

<script setup lang="ts">
  import { useMenuCollapse } from '@/layout/hooks'
  const { collapse, toggle } = useMenuCollapse()
</script>

<style lang="scss" scoped>
  @import '@/layout/styles/define.scss';
  .hamburger-btn {
    @extend %pa;
    @extend %cp;
    @extend %df;
    @extend %aic;
    @extend %jcc;
    color: #86909c;
    width: j(24);
    height: j(24);
    right: j(12);
    bottom: j(12);
    background-color: #f7f8fa;
    &:hover {
      color: $color-primary;
    }
  }
</style>
