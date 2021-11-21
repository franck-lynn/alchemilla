<template>
    <div class="vuer-input" :class="{'vuer-input_suffix':showSuffix}">
        <input class="vuer-input_inner" :class="{'is-disabled': disabled}" :placeholder="placeholder" :type="showPassword ? (passwordVisible ? 'text' : 'password') : type" 
        :name="name" :value="modelValue" @input="handleChange" @blur="handleBlur" :disabled=disabled style="'ime-mode':disabled"
        :autocomplete="autocomplete">
        
        <!-- :name="name" :value="value" @input="handleChange" :disabled=disabled> -->
        <span class="vuer-input_suffix">
            <i class="iconfont icon-cancel" v-if="clearable && modelValue" @click="clear"></i>
            <i :class="`iconfont icon-password-${[passwordVisible ? 'visible': 'not-view']}`" v-if="showPassword && type=='password'" @click="handlePassword"></i>
        </span>
        <!-- 验证信息 -->
        <!-- <p class="help-message" v-show="errorMessage || meta.valid"> {{errorMessage}} </p> -->
    </div>
</template>

<script lang="ts">
    // import { useField } from 'vee-validate'
    // vue3 中的 v-model 绑定视频教程
    // https://www.bilibili.com/video/av754116529
    import { defineComponent, computed, ref, onMounted,/*  onUnmounted */ } from "vue";
    export default defineComponent({
        name: "vuer-input",
        components: {},
        props: {
            placeholder: { type: String, defalult: "" },
            type: { type: String, default: "text" },
            name: { type: String, default: "" },
            disabled: { type: Boolean, default: false },
            // 一般输入框 双绑的是 字符串类型
            modelValue: { type: String, default: "" },
            clearable: { type: Boolean, default: false },
            showPassword: { type: Boolean, default: false },
            autocomplete: {type: String, default: null}
        },
        setup(props, ctx) {
            const selectedClass = '.vuer-input_inner'
            const { clearable, showPassword } = props;
            const handleChange = (e) => {
                ctx.emit("update:modelValue", e.target.value);
            };

            const clear = () => {
                // 把内容清空, 通知 父组件, 让父组件把内容清空
                ctx.emit("update:modelValue", "");
            };
            // 控制 小图标的显示, 密码 和 一次性清空的小图标
            const showSuffix = computed(() => clearable || showPassword);
            // 显示密码, 用 passwordVisible 控制是否显示密码对话框
            let passwordVisible = ref(false);
            const handlePassword = () => {
                // console.log("密码是否显示?", passwordVisible.value);
                // 要修改父组件的 type, 但是要改自己的来控制父组件
                passwordVisible.value = !passwordVisible.value;
                // console.log("修改后的passwordVisible=", passwordVisible.value);
            };
            // const {
            //     value: modelValue,
            //     errorMessage,
            //     handleBlur,
            //     // handleChange,
            //     meta
            // } = useField(props.name, undefined, {initialValue: props.value})
            const focus = (e) => ctx.emit('focus', e)
            const blur = (e) => ctx.emit('blur', e)
            onMounted(() => {
                 //! 这个事件会传给 父组件上监听 @focus 事件,
                document.querySelector(selectedClass).addEventListener('focus', focus)
                document.querySelector(selectedClass).addEventListener('blur', blur)
                
            })
            //TODO: 这个钩子存在问题, 切换路由时会提示找不到 .removeEventListener 方法
            // onUnmounted(() => {
            //     document.querySelector(selectedClass).removeEventListener('focus', focus )
            //     document.querySelector(selectedClass).removeEventListener('blur', blur )
            // })


            return {
                handleChange,
                showSuffix,
                clear,
                passwordVisible,
                handlePassword,
                // handleBlur,
                // errorMessage,
                // modelValue,
                // meta,
            };
        },
    });
</script>

<style lang="scss" scoped>
    $height: 46px;

    @at-root {
        #{$prefix}input {
            width: 100%;
        }
    }

    .#{$prefix}input {
        /* 降低 width 权重, 以便外面可以覆盖这个值 */
        /* width: 100%; */
        position: relative;
        font-size: 16px;
        display: inline-block;

        .#{$prefix}input_inner {
            -webkit-appearance: none;
            background-color: #fff;
            background-image: none;
            border: 1px solid #dcdfe6;
            border-radius: 4px;
            box-sizing: border-box;
            color: #606266;
            display: inline-block;
            font-size: inherit;
            height: $height;
            line-height: $height;
            outline: none;
            padding: 0 15px;
            // 这个会导致输入框失去焦点时显示的黄色效果, 有点不舒服, 注释掉, 如果感觉可以就再打开吧
            // transition: border-color 0.2s cubic-bezier(0.645, 045, 0.355, 1);
            width: 100%;

            &:focus {
                outline: none;
                border-color: #409eff;
            }

            // input禁用样式
            &.is-disabled {
                background-color: #f5f7fa;
                border-color: #e4e7ed;
                color: #c0c4cc;
                cursor: not-allowed;
            }
        }
    }

    // 后面加suffix的意思是后面如果有后缀的话，触发该样式
    .#{$prefix}input_suffix {
        .#{$prefix}input_inner {
            padding-right: 30px;
        }

        .#{$prefix}input_suffix {
            position: absolute;
            right: 10px;
            height: $height;
            top: 0;
            line-height: $height;
            text-align: center;
            color: #c0c4cc;
            transition: all 0.3s;
            z-index: 90;
            box-sizing: border-box;

            i {
                color: #c0c4cc;
                font-size: 14px;
                cursor: pointer;
                transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
            }
        }
    }
</style>