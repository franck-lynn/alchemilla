<template>
    <header class="header-menu">
        <slot name="header-menu"></slot>
    </header>

    <section class="main-content-scrollbar">
        <div class="main-content">
            <slot name="main-content">主内容区域</slot>
        </div>
    </section>

    <footer class="sticky-footer">
        <slot name="footer"></slot>
    </footer>
</template>

<script lang="ts">
import {defineComponent, onMounted} from "vue"
export default defineComponent({
    name: "r3-layout",
    props: {},
    setup() {
        onMounted(() => {
            // document.querySelector(".main-content").scrollTo = 0
            // document.querySelector(".main-content").scrollTop = 200
        })
        return {}
    }
})
</script>

<style lang="scss" scoped>
$height-level-menu: 45px; // 把导航栏的高度空出来, 这样页面内容就不会被导航栏遮住了
$width-scrollbar: 6px; // 滚动条宽度(c2-layout.vue 中已有定义, 重复定义)
$height-footer: 40px;

header {
    right: $width-scrollbar; // 距离右边的距离, 和滚动条接触对齐
    width: 100%;
    height: 45px;
    display: flex;
    background-color: #eee;
    align-items: center;
}

.main-content-scrollbar {
    // white-space: pre-wrap;
    white-space: normal;
    width: 100%;
    // min-height: calc(100% - $height-header-footer); // 这种写法不行
    min-height: calc(100% - 84px); // 为什么减去84px, 因为页头高度45px, 页脚40px, 另加了线高1
    overflow-y: auto;

    .main-content {
        margin: 10px;
        // height: 100%;
        -webkit-user-select: text;
        user-select: text; // 允许用户选择
    }
}

.sticky-footer {
    flex: 0 0 auto; // flex-grow, flex-shrink 和 flex-basis 简写, 0 本来不缩小 , auto 项目本来大小
    background-color: #fff;
    color: #7a7676;
    font-size: 12px;
    border-top: 1px solid #eff0f4;
    height: $height-footer;
    line-height: $height-footer;
    display: flex;
    justify-content: flex-end;
    // margin-right: 15px;
}

::-webkit-scrollbar {
    width: $width-scrollbar; //! 在这里设置滚动条的样式 滚动条的宽度
}

::-webkit-scrollbar-track {
    background: #424f63; // 滚动槽
    cursor: default;
    height: 100%;
    opacity: 0.5;
    visibility: hidden;
    // transition: all .2s linear; // 代替display 实现过渡效果

    &:hover {
        opacity: 1;
        visibility: visible; // 当鼠标移到到滚动槽时才显示滚动条
    }
}

::-webkit-scrollbar-thumb {
    border-radius: math.div($width-scrollbar, 2); // 滚动条滑块
    background-color: #65cea87e;
    visibility: hidden;

    &:hover {
        visibility: visible;
    }
}

//设置侧边栏滚动条不显示 chrome
// ::-webkit-scrollbar {display:none}
</style>
