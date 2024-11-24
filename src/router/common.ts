import { LayoutView } from '@/layout/index'

import { defineRoutes } from './defineRoutes'

export default defineRoutes([
  //登陆过后的仪表台
  {
    path: '/',
    component: LayoutView,
    hidden: true,
    name: 'RootRoute',
    children: [
      {
        path: '',
        name: 'DashboardView',
        component: () => import('@/views/common/DashboardView.vue'),
        meta: { title: '控制台', requiresAuth: 1, hideSlidebar: true },
      },
    ],
  },
  //登录和重置密码不需要Layout
  {
    path: '/login',
    hidden: true,
    name: 'AuthView',
    component: () => import('@/views/common/AuthView.vue'),
    children: [
      {
        path: '/login',
        name: 'LoginView',
        component: () => import('@/views/common/LoginView.vue'),
        meta: { title: '登录', requiresAuth: -1 },
      },
      {
        path: '/password-reset',
        name: 'PasswordResetView',
        component: () => import('@/views/common/PasswordResetView.vue'),
        meta: { title: '重置密码', requiresAuth: -1 },
      },
    ],
  },
])
