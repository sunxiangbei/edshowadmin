import { createApp } from 'vue'
//引入pinia
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
//引入tailwindcss文件
import '@/styles/tailwind.css'
import '@/styles/index.less'
//创建pinia并去下面进行挂载
const pinia = createPinia()

const app=createApp(App)

app.use(router).use(pinia).mount('#app')

