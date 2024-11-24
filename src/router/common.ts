import { LayoutView } from '@/layout/index'

import { defineRoutes } from './defineRoutes'

export default defineRoutes([
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
])
