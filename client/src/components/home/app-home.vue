<template>
    <c2-layout>
        <template #c2-resizable-left>
           <!--  <sidebar-index :data="data">
                <template #logo>
                    <logo></logo>
                </template>

                <template #sidebar-footer>
                    <sidebar-footer></sidebar-footer>
                </template>
            </sidebar-index> -->
        </template>

        <template #c2-resizable-right>
            <r3-layout>
                <template #header-menu>
                    <r1-layout>
                        <!-- 水平菜单左 -->
                        <template #r1-left>
                            <!-- <goodu></goodu> -->
                        </template>
                        <!-- 水平菜单右 -->
                        <template #r1-right>
                            <!-- <dropdown-menus></dropdown-menus> -->
                        </template>
                    </r1-layout>
                </template>

                <!-- 主内容区域的插槽放在这里, 直接插入的是内容 -->
                <template #main-content>
                    <!-- <vuer-button> app-home.vue 可以添加内容</vuer-button> -->
                    <div>主内容</div>
                    <div>主内容</div>
                    <div>主内容</div>
                    <div>主内容</div>
                    <div>主内容</div>
                    <div>主内容</div>
                    <div>主内容</div>
                    <div>主内容</div>
                    <div>主内容</div>
                    <div>主内容</div>
                    <div>主内容</div>
                    <div>主内容</div>
                    <div>主内容</div>
                    <div>主内容</div>
                    <div>主内容</div>

                    <!-- <dropdown-menus></dropdown-menus>  -->
                </template>

                <template #footer>
                    <sticky-footer></sticky-footer>
                </template>
            </r3-layout>
        </template>
    </c2-layout>
</template>

<script lang="ts">
import data from '../datum/sidebar-list.json'
import {defineComponent} from "vue"
export default defineComponent({
    name: "app-home",
    props: {},
    setup() {
        return {data}
    }
})
</script>

<style lang="scss" scoped></style>
