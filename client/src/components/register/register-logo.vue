<template>
    <div class="register-logo">
        <router-link to="/register">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path
                    fill-rule="evenodd"
                    d="M19.25 1a.75.75 0 01.75.75V4h2.25a.75.75 0 010 1.5H20v2.25a.75.75 0 01-1.5 0V5.5h-2.25a.75.75 0 010-1.5h2.25V1.75a.75.75 0 01.75-.75zM9 6a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM4 9.5a5 5 0 117.916 4.062 7.973 7.973 0 015.018 7.166.75.75 0 11-1.499.044 6.469 6.469 0 00-12.932 0 .75.75 0 01-1.499-.044 7.973 7.973 0 015.059-7.181A4.993 4.993 0 014 9.5z"
                ></path>
            </svg>
        </router-link>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
export default defineComponent({
    name: "register-logo",
    props: {},
    setup() {
        return {}
    }
})
</script>

<style lang="scss" scoped>
.register-logo, a {
    height: 100%;
    width: 100%;
} 
// svg 注册图标
.header {
    svg {
        height: 100%;
        width: 100%;
        opacity: 0.5;

        &:hover {
            fill: #203f5f;
        }
    }
}
</style>
