/*
 * @Date: 2022-08-18 10:14:00
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-08-19 09:42:25
 * @FilePath: /shopify-management/src/router/index.js
 */
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/pluginConfig'
  },
  {
    path: '/pluginConfig',
    name: 'PluginConfig',
    component: () => import('../pages/picture-puzzle/PicturePuzzle.vue')
  },
  {
    path: '/areaConfig',
    name: 'areaConfig',
    component: () => import('../pages/area-config/AreaConfig.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export {
  router
}
