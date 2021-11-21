<template>
    <post-email v-if="!hasToken"></post-email>
    <change-password v-else :username="username"></change-password>
</template>

<script lang="ts">
    import { ComponentInternalInstance, defineComponent, getCurrentInstance, onMounted, ref} from 'vue'
    export default defineComponent({
        name: 'password-reset',
        props: {},
        setup() {
            const { ctx } = getCurrentInstance() as ComponentInternalInstance
            const currentRoute = ctx.$root.$route // 当前的路由 url
            // 当前路由url是否带了口令, 如果带了口令, 说明已经发送过给邮箱链接了
            const currentToken = currentRoute.params && currentRoute.params.token ? currentRoute.params.token : null
            // console.log("当前路由上是否存在token?----> ", currentToken)
            // 需要检测口令是否正确, 不正确, 还是要返回到没有口令的状态
            const hasToken = ref(false)
            const username = ref()
            onMounted(async () => {
                 // 链接后面没有带 token, 不用说, 肯定是提交邮箱的, 这种情况是默认 hasToken 状态, 无需处理
                 // 如果带了 token, 还要发给服务器判断这个 token 是不是真的, 如果服务器说不是有效 token, 
                 // 还是不能到 change-password 页面
                if (currentToken) {
                    const isToken = await fetch(`/password-reset/${currentToken}`)
                    const res = await isToken.json()
                    if (res.msg) {
                        username.value = res.username
                        hasToken.value = true
                    }
                } 
            })

            return { hasToken, username }
        }
    })
</script>

<style lang="scss" scoped>

</style>