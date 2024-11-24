<template>
  <div class="side-bar">
    <ElScrollbar class="side-bar-inner">
      <ElMenu
        class="side-bar-content"
        mode="vertical"
        :collapse="collapse"
        :unique-opened="false"
        :collapse-transition="false"
        :default-active="computedActiveMenu"
        @select="handleSelect"
      >
        <SidebarCell
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </ElMenu>
    </ElScrollbar>

    <HamburgerBtn />
  </div>
</template>

<script setup lang="ts">
  import { useMenuCollapse } from '@/layout/hooks'

  import HamburgerBtn from './HamburgerBtn.vue'
  import SidebarCell from './SidebarCell.vue'

  const router = useRouter()
  const route = useRoute()
  const { collapse } = useMenuCollapse()

  const routes = computed(() => {
    const data = router.options.routes.find(
      (item) => !item.hidden && route.path.startsWith(item.path),
    )
    return data?.children ?? []
  })

  const selectPath = ref('')
  const handleSelect = (path: string) => {
    selectPath.value = path
    nextTick(() => (selectPath.value = ''))
  }

  const computedActiveMenu = computed(() => {
    const { meta, path } = route
    return selectPath.value || ((meta?.activePath ?? path) as string)
  })
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/define.scss';
  .side-bar {
    @extend %bsb;
    padding-top: j(4);
    user-select: none;
    background-color: #fff;
  }
  .side-bar-inner {
    @extend %h100;
  }
  .side-bar-content {
    border-right: none;
    padding: 0 j(8);

    --el-menu-item-height: 40px;
    --el-menu-sub-item-height: 40px;

    --el-menu-base-level-padding: 8px;
    --el-menu-level-padding: 12px;
    --el-menu-text-color: #4e5969;

    --el-menu-icon-margin-right: 10px;
    --el-menu-icon-width: 20px;

    :deep {
      .el-icon {
        margin-right: var(--el-menu-icon-margin-right);
      }
      .el-sub-menu {
        margin-top: j(4);
        &.is-active {
          > .el-sub-menu__title {
            font-weight: 500;
            color: $color-primary;
          }
        }
      }
      .el-menu-item {
        margin-top: j(4);
        &.is-active {
          font-weight: 500;
          background-color: var(--el-menu-hover-bg-color);
        }
      }

      &.el-menu--vertical:not(.el-menu--collapse):not(.el-menu--popup-container) {
        .el-menu-item {
          padding-left: var(--el-menu-level-padding);
        }
      }
      .el-sub-menu {
        .el-sub-menu__title,
        .el-menu-item {
          padding-left: var(--el-menu-level-padding);
        }
      }
      &.el-menu--collapse {
        width: auto;
        padding: 0;
        --el-menu-base-level-padding: 0;
        --el-menu-level-padding: 0;
        .el-icon {
          margin-right: 0;
        }
        .el-sub-menu__title,
        .el-menu-tooltip__trigger {
          padding-left: j(12);
        }
      }
    }
  }
</style>
