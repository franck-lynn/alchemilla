<template>
    <div class="vuer-form">
        <slot></slot>
    </div>
</template>

<script>
    import { defineComponent, provide } from 'vue'
    export default defineComponent({
        name: 'vuer-form',
        components: {},
        props: {
            model: { type: Object, required: true },
            labelWidth: { type: String, default: '80px' }
        },
        setup(props) {
            const formItemSymbol = Symbol.for('formItem')
            provide(formItemSymbol, props.labelWidth)
            return {
            }
        }
    })
</script>

<style lang="scss" scoped>

</style>