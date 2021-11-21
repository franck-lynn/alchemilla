<template>
    <span class="password-readme">
        <span class="password-readme-text"> 至少3个字符(包含数字和小写字母). </span>
        <router-link class="password-readme-more" to="/"> 了解更多 </router-link>
    </span>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'password-readme',
        props: {},
        setup() {

            return {}
        }
    })
</script>

<style lang="scss" scoped>
    .password-readme {
        display: block;
        width: 100%;
        margin-top: 1.5rem;
        font-size: 0.8rem;

        // padding-left: 6px;
        .password-readme-more {
            margin-left: 8px;
        }
    }
</style>