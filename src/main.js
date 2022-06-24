import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import '@/common/sass/element-variables.scss'
import App from './App.vue'
import './common/sass/index.scss'

const app = createApp(App)

app.use(ElementPlus)

app.mount('#app')
