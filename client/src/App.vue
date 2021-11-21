<template>
    <router-view></router-view>
</template>

<script lang="ts">
import {defineComponent} from "vue"
export default defineComponent({
    name: "App",
    props: {},
    setup() {
        return {}
    }
})
</script>

<style lang="scss">
//! @use "sass:math"; 需要改在 vite.config.ts 配置引入
// scss 是配置的别名
// @import "scss/scss/entries/main";
@import "scss/scss/entries/shared"; // shared.scss 已经引入了 compass
// shared.scss 引入了 compass, 并且已经运行 @include global-reset; 这个函数, 清除所有的默认样式
// 全局设置 placeholder

input[type="text"],
input[type="password"] {
    @include input-placeholder {
        color: #999999;
        opacity: 0.6;
    }
}
/* 不显示滚动条, 要加在整个页面, 不然, 就加在容器上 */
::-webkit-scrollbar {
    display: none;
}
</style>
