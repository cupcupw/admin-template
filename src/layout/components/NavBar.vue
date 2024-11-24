<template>
  <ElScrollbar class="nav-bar">
    <div class="nav-bar-content">
      <RouterLink v-for="(item, index) in routes" :key="index" class="nav-item" :to="item.path">
        <ProIcon :name="item.meta?.icon" size="28" />
        <span>{{ item.meta?.title }}</span>
      </RouterLink>
    </div>
  </ElScrollbar>
</template>

<script setup lang="ts">
  import { ElScrollbar } from 'element-plus'

  const router = useRouter()
  const routes = computed(() => {
    return router.options.routes.filter((route) => !route.hidden)
  })
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/define.scss';
  .nav-bar {
    background-color: $color-primary;
  }
  .nav-bar-content {
    @extend %df;
    @extend %aic;
    @extend %h100;
    @extend %bsb;
    height: var(--ly-navbar-height);
  }
  .nav-item {
    @extend %df;
    @extend %fdc;
    @extend %aic;
    @extend %jcc;
    @extend %bsb;
    @extend %cfff;
    @extend %tac;
    @extend %h100;
    flex-shrink: 0;
    font-size: j(13);
    padding: 0 j(10);
    width: j(90);
    word-break: break-all;
    &.router-link-active {
      color: $color-primary;
      background-color: #fff;
    }
    span {
      @include twno(2);
      margin-top: j(6);
      line-height: 1;
    }
  }
</style>
