<template>
    <transition name="dialog-fade">
        <div class="vuer-dialog_wrapper" v-show="modelValue" @click.self="handleClose">
            <!-- transition 的标签注释应该放在这里, 不能放在根组件下 -->
            <!-- @click.self避免冒泡，只有点击自己时才能触发   -->
            <div class="vuer-dialog" :style="{width:width,marginTop:top}">
                <div class="vuer-dialog_header">
                    <slot name="title">
                        <!-- 将span放到slot内，这样不仅可以定义title文本，还可以定义样式等 -->
                        <span class="vuer-dialog_title">
                            {{title}}
                        </span>
                    </slot>
                    <button class="vuer-dialog_headerbtn" @click="handleClose">
                        <i class="iconfont icon-cancel"></i>
                    </button>
                </div>
                <div class="vuer-dialog_body">
                    <!-- 内容可能是除span以外的其他内容，比如列表等，所以在这里使用插槽，并且不规定插槽内具体的标签 -->
                    <!-- 并且在这里使用匿名插槽，使用匿名插槽的好处就是不用指定名称，这样在不使用<template v-slot>指定插槽内容的时候，也可以自定义内容 -->
                    <slot></slot>
                </div>
                <div class="vuer-dialog_footer">
                    <!-- 如果footer不传递内容，则不显示footer -->
                    <slot name="footer" v-if="$slots.footer">
                    </slot>
                </div>
            </div>
        </div>
    </transition>

</template>

<script>
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'vuer-dialog',
        components: {},
        props: {
            title: { type: String, default: '提示' },
            width: { type: String, default: '50%' },
            top: { type: String, default: '15vh' },
            footer: { type: Object },
            // visible: { type: Boolean, default: false },
            modelValue: { type: Boolean, default: false }
        },
        setup(props, ctx) {
            const handleClose = () => {
                // console.log("触发")
                // ctx.emit('close', false)
                ctx.emit('update:modelValue', false)
            }
            return {
                handleClose
            }
        }
    })
</script>

<style lang="scss" scoped>
    .#{$prefix}dialog_wrapper {
        position: fixed; // 表示整个模态框的底层
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: auto;
        margin: 0;
        z-index: 50;
        background-color: rgba(0, 0, 0, 0.5);

        .#{$prefix}dialog {
            position: relative;
            margin: 15vh auto 50px;
            background: #fff;
            // background: red;
            border-radius: 2px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
            box-sizing: border-box;
            width: 30%;

            &_header {
                padding: 20px 20px 10px;

                .#{$prefix}dialog_title {
                    line-height: 24px;
                    font-size: 18px;
                    color: #303133;
                }

                .#{$prefix}dialog_headerbtn {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    padding: 0;
                    background: transparent;
                    border: none;
                    outline: none;
                    cursor: pointer;
                    font-size: 16px;

                    .icon-cancel {
                        color: 909399
                    }
                }
            }

            &_body {
                padding: 30px 20px;
                color: #606266;
                font-size: 14px;
                word-break: break-all;
            }

            &_footer {
                padding: 10px 20px 20px;
                text-align: right;
                box-sizing: border-box;

                ::v-deep(.#{$prefix}button:first-child) {
                    margin-right: 20px;
                }
            }
        }
    }

    .dialog-fade-enter-active {
        animation: fade .3s;
    }

    .dialog-fade-leave-active {
        animation: fade .3s reverse;
    }

    @keyframes fade {
        0% {
            opacity: 0;
            transform: translateY(-20px);
        }

        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>