<template>
    <div class="vuer-form-item">
        <!-- 显示一个 label, labelStyle 从父组件传过来的 -->
        <label :style="{width: labelStyle}" class="vuer-form-item_label">{{label}}</label>
        <div class="vuer-form-item_content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import { defineComponent, inject } from 'vue'
    export default defineComponent({
        name: 'vuer-form-item',
        components: {},
        props: {
            label: { type: String, default: '' }
        },
        setup() {
            const formItemSymbol = Symbol.for('formItem')
            // 父组件传过来的 样式, 父组件的样式从爷爷组件那里传过来的
            const labelStyle = inject(formItemSymbol, '')
            return {
                labelStyle
            }
        }
    })
</script>

<style lang="scss" scoped>
    .#{$prefix}input {
        width: 180px;
        margin-right: 10px
    }


    .#{$prefix}form-item {
        margin-bottom: 25px;

        .#{$prefix}form-item_label {
            text-align: right;
            vertical-align: middle;
            float: left;
            font-size: 14px;
            color: #606266;
            line-height: 40px;
            padding: 0 12px 0 0;
            box-sizing: border-box;
        }

        .#{$prefix}form-item_content {
            line-height: 40px;
            position: relative;
            font-size: 14px;
            overflow: hidde;
        }
    }
</style>