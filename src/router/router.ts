import { createRouter, createWebHashHistory, type RouterOptions } from 'vue-router'

import common from './common'
import todo from './modules/todo'

const createRouterOptions = (): RouterOptions => ({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [...common, ...todo],
})

export const router = createRouter(createRouterOptions())
