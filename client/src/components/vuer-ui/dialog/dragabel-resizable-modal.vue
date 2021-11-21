<template>
    <teleport to="body">
        <transition name="modal-fade">
            <div class="vuer-modal_wrapper" v-show="modelValue" @click.self="handleClose">
                <!-- @click.self="handleClose" 放到 dragable-resizable-layout 内部 -->
                <dragable-resizable-layout>
                    <template v-slot:content-header>
                        <div class="content-header"> {{title}} </div>
                    </template>
                    <template v-slot:main-content> 内容 </template>
                </dragable-resizable-layout>
            </div>
        </transition>
    </teleport>
</template>

<script>
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'dragabel-resizable-modal',
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
            return { handleClose }
        }
    })
</script>

<style lang="scss" scoped>
    .#{$prefix}modal_wrapper {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 100;
    }

    .content-header {
        width: 100%; // 菜单栏宽度
        height: 45px; // 菜单栏高度
        padding-left: 20px;
        display: flex;
        align-items: center;
        background-color: #f3f3f3;
    }

    // 动画效果
    .modal-fade-enter-active {
        animation: fade .3s;
    }

    .modal-fade-leave-active {
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