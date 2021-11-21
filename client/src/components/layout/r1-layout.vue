<template>
    <div class="r1-level">
        <slot name="r1-left"></slot>
        <slot name="r1-right"></slot>
        <!-- app-home.vue 使用了这个插槽-->
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'r1-layout',
        props: {},
        setup() {

            return {}
        }
    })
</script>

<style lang="scss" scoped>
    .r1-level {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center; // 单行居中
    }
</style>