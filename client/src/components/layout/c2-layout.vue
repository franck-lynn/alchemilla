<template>
    <div class="scalable">
        <div class="c2-resizeable-left">
            <div :class="['sidebar-left', {narrow: isNarrow}]">
                <slot name="c2-resizable-left"></slot>
            </div>
            <div class="separator">
                <i></i>
                <i></i>
            </div>
        </div>

        <div class="c2-resizable-right">
            <slot name="c2-resizable-right"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import {useResizable, isNarrow} from "../../helpers"
import {defineComponent} from "vue"
export default defineComponent({
    name: "c2-layout",
    props: {},
    setup() {
        useResizable()
        return {isNarrow}
    }
})
</script>

<style lang="scss" scoped>
// $height-level-menu: 45px; // 把导航栏的高度空出来, 这样页面内容就不会被导航栏遮住了
$color-sidebar-background: #353f4f; // 侧边栏背景色
$width-separator: 2px; // 拖拉分割线的宽度
$min-width-sidebar: 45px; // 左侧边栏最小宽度
$max-width: 400px;

.scalable {
    // 改为 100%, 页脚不能始终在下面, 但是 .c2-resizable-right 框可以设置为弹性大小
    // 改100vh 时 .c2-resizable-right 框 也可以按需要撑大. 所以改用 100vh
    height: 100%;
    display: flex;
    -webkit-user-select: none;
    user-select: none; // 禁用用户选择
    white-space: nowrap; // 段落中的文本不换行
    /* 强制性的在一行显示所有的文本，直到文本结束或者遭遇br标签对象才换行*/
    overflow: hidden; // 溢出的文字隐藏起来
    text-overflow: ellipsis; // 溢出的文字使用圆点显示

    .c2-resizeable-left {
        position: relative;
        height: 100%;
        min-width: $min-width-sidebar; // 往左边移动时的最小幅度, 再小就不能移动了
        // max-width: $max-width; // 注销掉可以实现随意大小的侧边栏, 甚至可以铺满整个屏幕
        display: flex;
        // 这里可以仿照 app-layout.vue 里修改滚动调的颜色, 宽度等
        justify-content: flex-start;
        z-index: 2;
        background-color: $color-sidebar-background;

        .sidebar-left {
            height: 100%;
            width: 100%;
            background-color: $color-sidebar-background;
            display: flex; // 整个侧边栏的布局样式在 scalable 类
            flex-direction: column;
            justify-content: space-between;
        }

        // 分割线
        .separator {
            width: $width-separator;
            height: 100%;
            background-color: $color-sidebar-background;
            cursor: col-resize;
            display: flex;
            justify-content: center;
            align-items: center;

            i {
                // 两条小细线
                display: inline-block;
                height: 14px;
                width: 1px;
                // background-color: #e9e9e9;
                margin: 0 1px;
            }
        }
    }

    .c2-resizable-right {
        flex: 1; //给左侧板栏用的
        height: 100%;
        // min-height: 100%;
        display: flex;
        flex-direction: column;
    }
}
</style>
