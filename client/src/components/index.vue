<template>
    <header class="header-menu">
        <router-link to="/login" class="link-page login">登录</router-link>
        <router-link to="/register" class="link-page register">注册</router-link>
    </header>
    <section class="main-content-scrollbar">
        <h1>标题文字: 使用说明</h1>
        <!-- 子路由出口的地方 -->
        <section>
            <div class="main-content">
                这里添加内容文字
            </div>
        </section>
        <!-- <router-view></router-view> -->
    </section>

    <footer class="sticky-footer">
        <sticky-footer></sticky-footer>
    </footer>
</template>

<script lang="ts">
import {defineComponent} from "vue"
export default defineComponent({
    name: "index",
    props: {},
    setup() {
        return {}
    }
})
</script>

<style lang="scss" scoped>
$height-icon-btn: 45px; // 把导航栏的高度空出来, 这样页面内容就不会被导航栏遮住了
$height-footer: 40px;

.header-menu {
    height: $height-icon-btn;
    width: 100%;
    display: flex;
    background-color: #eee;
    justify-content: flex-end;
    // justify-content: center;
    align-items: center;

    .link-page {
        margin-right: 0.5rem;
    }
}

.main-content-scrollbar {
    // white-space: pre-wrap;
    white-space: normal;
    width: 100%;
    // max-height: calc(100% - #{$height-icon-btn} - #{$height-footer} - 11px);
    // 为什么减去11px, 因为页头高度45px, 页脚40px, 另加了线高1, 还有 h1 的margin-top: 10px
    height: calc(100% - #{$height-icon-btn} - #{$height-footer} - 11px);
    flex: auto;
    // overflow-y: auto;
    h1 {
        margin-left: 10px;
        margin-top: 10px;
    }

    .main-content {
        margin: 10px;
        // height: 100%;
        -webkit-user-select: text;
        user-select: text; // 允许用户选择
    }
}

.sticky-footer {
    display: flex;
    height: $height-footer;
    flex: 0 0 auto; // flex-grow, flex-shrink 和 flex-basis 简写, 0 本来不缩小 , auto 项目本来大小
    background-color: #fff;
    color: #7a7676;
    font-size: 12px;
    border-top: 1px solid #eff0f4;
    line-height: $height-footer;
    justify-content: flex-end;
    // margin-right: 15px;
}
::-webkit-scrollbar {
    display: none; // 不显示滚动条
}
// ::-webkit-scrollbar {
//     width: $width-scrollbar; //! 在这里设置滚动条的样式 滚动条的宽度
// }

// ::-webkit-scrollbar-track {
//     background: #424f63; // 滚动槽
//     cursor: default;
//     height: 100%;
//     opacity: 0.5;
//     visibility: hidden;
//     // transition: all .2s linear; // 代替display 实现过渡效果

//     &:hover {
//         opacity: 1;
//         visibility: visible; // 当鼠标移到到滚动槽时才显示滚动条
//     }
// }

// ::-webkit-scrollbar-thumb {
//     border-radius: math.div($width-scrollbar, 2); // 滚动条滑块
//     background-color: #65cea87e;
//     visibility: hidden;

//     &:hover {
//         visibility: visible;
//     }
// }
</style>
