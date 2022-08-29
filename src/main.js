/*
 * @Date: 2022-06-21 10:57:35
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-08-18 13:33:32
 * @FilePath: /shopify-management/src/main.js
 */
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import '@/common/sass/element-variables.scss'
import App from './App.vue'
import './common/sass/index.scss'
import { router } from './router'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)

app.mount('#app')
