<template>
    <footer class="sticky-footer">
        Copyright © 2021 Franck.lynn. All rights reserved. 
    </footer>
</template>

<script  lang="ts">
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'sticky-footer',
        props: {},
        setup() {

            return {}
        }
    })
</script>

<style lang="scss" scoped>
    .sticky-footer {
        flex: 0 0 auto; // flex-grow, flex-shrink 和 flex-basis 简写, 0 本来不缩小 , auto 项目本来大小
        background-color: #fff;
        color: #7A7676;
        font-size: 12px;
        border-top: 1px solid #eff0f4;
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: flex-end;
        margin-right: 10px;
    }
</style>