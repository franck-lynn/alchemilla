// 一次性注册 components 文件夹下的所有组件
// 相当于 import xxx from 'xxx.vue'

import type {App as Application} from 'vue'

// 读取文件在 /helpers/import-files.ts
import {files } from '../helpers'
// main.ts 中安装这些组件
const install = (app: Application): void => {

    Object.keys(files).forEach((c: string) => {
        const component = files[c]?.default
        // 挂载全局控件
        app.component(component.name as string, component)
    })
}

export default install
