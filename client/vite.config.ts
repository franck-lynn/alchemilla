// https://www.pipipi.net/vite/config/
// https://vitejs.dev/config/
// vite.config.ts

import path from "path"
import {UserConfig} from "vite"
import vue from "@vitejs/plugin-vue" // vue 插件

const config: UserConfig = {
    mode: "development",
    build: {
        sourcemap: "inline"
    },
    resolve: {
        alias: {
            // 别名
            "@": path.resolve(__dirname, "./src/"),
            "~": "F:/node/node_modules/",
            scss: "./src/scss/",
            typings: "./typings/"
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
               @use "sass:math"; // 需要在任意规则之前, 那就放在这里
               @import '~/compass-mixins/lib/compass.scss';
               @import "scss/scss/entries/main.scss";
               @import "~/include-media/dist/include-media.scss";
               `
            }
        }
    },
    plugins: [vue()], // vue 的支持
    server: {
        fsServe: {strict: false},
        host: "0.0.0.0",
        port: 8080,
        proxy: {
            "/api": {
                target: "http://localhost:3000/", // 本机
                changeOrigin: true, //开启代理
                // 请求位置的路由这么写:
                // await fetch("http://localhost:3000/api") 加上 /api这个路径
                rewrite: (path) => path.replace(/^\/api/, "") // api 开头的路由都替换为空
            }
        }
    }
}
export default config

// 连接-本地 IPv6 地址: fe80::ccb4:b602:b17f:6ac9%17

// 	你的公网 IPv4 地址是 183.129.45.70
// 你的公网 IPv6 地址是 240e:390:98c:8630:3d8e:f326:6293:d86d
// http://[240e:390:98c:8630:3d8e:f326:6293:d86d]:8080/#/
// http://[240e:390:98d:a940:b428:baaf:3139:19a0]:8080/#/
// http://ip6-localhost:8080/#/

// IPv6 地址: 240e:390:98d:a940:b428:baaf:3139:19a0
// 移动IPV6本地地址:	fe80::4eab:fcff:fe1:f961
// http://[2409:8a28:865:6e0:a9eb:c427:2767:4188]:8080/#/
