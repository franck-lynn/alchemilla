import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
// 使用 components 组件
import vuerComponents from './components/'

const app = createApp(App)

app.use(vuerComponents)
app.use(router)

app.mount('#root')