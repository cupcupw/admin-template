<template>
  <div
    class="layout-wrap"
    :class="[
      collapse ? 'is-collapse-slidebar' : 'is-open-slidebar',
      $route.meta.hideSlidebar ? 'is-hide-slidebar' : '',
    ]"
  >
    <div class="layout-header">
      <TopBar />
      <NavBar />
    </div>
    <div class="layout-inner">
      <SideBar class="layout-slidebar" />
      <div class="layout-content">
        <div class="layout-view">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { NavBar, SideBar, TopBar } from './components'
  import { useMenuCollapse } from './hooks'
  const { collapse } = useMenuCollapse()
</script>

<style lang="scss" scoped>
  @import '@/layout/styles/index.scss';
  .layout-wrap {
    @extend %pr;
    &.is-open-slidebar {
      .layout-slidebar {
        width: var(--ly-slidebar-width);
      }
      .layout-inner {
        padding-left: var(--ly-slidebar-width);
      }
    }
    &.is-collapse-slidebar {
      .layout-slidebar {
        width: var(--ly-slidebar-collapse-width);
      }
      .layout-inner {
        padding-left: var(--ly-slidebar-collapse-width);
      }
    }
    &.is-hide-slidebar {
      .layout-slidebar {
        @extend %dn;
      }
      .layout-inner {
        padding-left: 0;
      }
    }
  }
  .layout-header {
    @extend %pf;
    @extend %t0;
    @extend %l0;
    @extend %r0;
    @extend %w100;
    min-width: var(--ly-min-width);
    z-index: 9;
    box-shadow: 0 1px 0 0 rgba(229, 230, 235, 1);
  }
  .layout-inner {
    @extend %bsb;
    @extend %df;
    @extend %fdc;
    transition: padding-left 0.3s;
    padding-top: calc(var(--ly-topbar-height) + var(--ly-navbar-height));
    padding-left: var(--ly-slidebar-width);
    min-height: 100vh;
  }
  .layout-slidebar {
    @extend %pf;
    @extend %l0;
    @extend %b0;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.08);
    transition: width 0.3s;
    width: var(--ly-slidebar-width);
    top: calc(var(--ly-topbar-height) + var(--ly-navbar-height));
    z-index: 8;
  }
  .layout-content {
    @extend %df1;
    padding: j(16);
  }
  .layout-view {
    background-color: #fff;
    min-height: calc(100vh - var(--ly-topbar-height) - var(--ly-navbar-height) - 16px - 16px);
  }
</style>
