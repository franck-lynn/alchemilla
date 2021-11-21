// 路由文件, 与注册组件的 index.ts 不同,
// 这个读取 vue 文件是添加到路由, 本文件交由 main.ts 使用
import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router"

const routes: Array<RouteRecordRaw> = [
    {
        path: "/index",
        name: "index",
        component: () => import("@/components/index.vue"),
        meta: {title: "登录页面"}
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/components/login/login.vue"),
        meta: {title: "登录页面"}
    },
    {
        path: "/register",
        name: "register",
        component: () => import("@/components/register/register.vue"),
        meta: {title: "注册页面"}
    },
    {
        path: "/password-reset/:token?",
        name: "passwortReset",
        component: () => import("@/components/login/password-reset.vue"),
        meta: {title: "forget your password"}
    },
    {
        path: "/change-password/",
        name: "changePassword",
        component: () => import("@/components/login/change-password.vue"),
        meta: {title: "change your password"}
    }
]

// https://router.vuejs.org/zh/guide/essentials/nested-routes.html
// 配置一个默认的路由
const defaultRoute: RouteRecordRaw = {
    path: "/",
    component: () => import("@/components/index.vue"),
    // redirect: "/home", // 利用 redirect 设置默认进入的主页 路由
    meta: {title: "首面"}
    // 这里设置子路由, 在 app-layout.vue 中设置连接
}
const homeRouter: RouteRecordRaw = {
    path: "/home",
    component: () => import("@/components/home/home.vue"),
    meta: {
        title: "主页",
        requireAuth: true
    }
    // children: homeRoutes
}

routes.push(defaultRoute)
routes.push(homeRouter)

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
