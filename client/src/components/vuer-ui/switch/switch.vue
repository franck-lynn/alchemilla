<template>
    <label for="name" class="vuer-switch" :class="{'is-checked': modelValue}" @click="handleClick">
        <span ref="core" class="vuer-switch_core">
            <span class="vuer-switch_button"></span>
        </span>
        <input ref="input" type="checkbox" class="vuer-switch_input" />
    </label>
</template>

<script lang="ts">
import {defineComponent, ref, nextTick, PropType, toRefs} from "vue"
export default defineComponent({
    name: "vuer-switch",
    components: {},
    props: {
        modelValue: {type: Boolean, default: false},
        activeColor: {type: String as PropType<string>, default: ""},
        inactiveColor: {type: String as PropType<string>, default: ""}
    },
    emits: ["update:modelValue"],
    setup(props, ctx) {
        //! props 中的 value 值直接解构出来 会失去响应
        const {activeColor, inactiveColor} = toRefs(props)
        // 控制颜色, 要操作DOM
        const core = ref<null | HTMLInputElement>(null)
        const input = ref<null | HTMLInputElement>(null)
        // 设置颜色的函数
        const setColor = () => {
            // console.log("打印一下core 元素", core.value)ss
            if (activeColor.value || inactiveColor.value) {
                let color: string = props.modelValue ? activeColor.value : inactiveColor.value
                ;(core.value as HTMLElement).style.borderColor = color
                ;(core.value as HTMLElement).style.backgroundColor = color
            }
            // input.value.checked = props.value
        }

        // 加载好后再执行
        // onMounted(
        //     setColor
        // )
        const handleClick = async () => {
            // console.log("通知父组件更新")
            await nextTick()
            ctx.emit("update:modelValue", !props.modelValue)
            setColor()
        }
        return {handleClick, core, input}
    }
})
</script>

<style lang="scss" scoped>
.#{$prefix}switch {
    width: 40px;
    height: 20px;
    display: inline-block;
    align-items: center;
    position: relative;
    font-size: 14px;
    line-height: 20px;
    vertical-align: middle;

    .#{$prefix}switch_core {
        margin: 0;
        display: inline-block;
        position: relative;
        width: 100%;
        height: 100%;
        border: 1px solid #dcdfe6;
        outline: none;
        border-radius: 10px;
        box-sizing: border-box;
        background: #dcdfe6;
        cursor: pointer;
        transition: border-color 0.3s, background-color 0.3s;
        vertical-align: middle;

        .#{$prefix}switch_button {
            // 活动的小圆点, 未选中时
            position: absolute;
            top: 1px;
            left: 1px;
            border-radius: 100%;
            transition: all 0.3s;
            width: 16px;
            height: 16px;
            background-color: #fff;
        }
    }
}

// 选中样式
.is-checked {
    .#{$prefix}switch_core {
        border-color: #409eff;
        background-color: #409eff;

        .#{$prefix}switch_button {
            transform: translateX(20px);
        }
    }
}

// 隐藏input标签
.#{$prefix}switch_input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    margin: 0;
}
</style>
