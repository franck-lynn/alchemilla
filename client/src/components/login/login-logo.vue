<template>
    <div class="header header-logged-out" role="banner">
        <div class="clearfix width-full text-center">
            <router-link to="/index">
                <!-- Octicons 图标是 github 使用的图标, 与阿里妈妈图标相比, 要简洁很多 -->
                <!-- https://github.com/primer/octicons -->
                <!-- https://primer.style/octicons/ -->
                <!-- person 图标 -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="96" height="96">
                    <path fill-rule="evenodd" d="M12 2.5a5.5 5.5 0 00-3.096 10.047 9.005 9.005 0 00-5.9 8.18.75.75 0 001.5.045 7.5 7.5 0 0114.993 0 .75.75 0 101.499-.044 9.005 9.005 0 00-5.9-8.181A5.5 5.5 0 0012 2.5zM8 8a4 4 0 118 0 4 4 0 01-8 0z"></path>
                </svg>
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'login-logo',
        props: {},
        setup() {

            return {}
        }
    })
</script>

<style lang="scss" scoped>
    // svg person 图标
    .header {
        margin-top: 6rem;
        svg {
            opacity: .5;
            &:hover {
                fill: #203f5f;
            }
        }
    }
</style>