<template>
    <div class="login">
        <div class="container">
            <login-logo></login-logo>
            <h2>登录</h2>
            <form @submit.prevent="onSubmit">
                <span :class="['error', {'error-show': JSON.stringify(errors) !== '{}'}]">
                    {{ errors.email || errors.password }}
                </span>
                <span :class="['error', {'error-show': errorMessage}]">{{ errorMessage }}</span>
                <!-- 如果你不想要浏览器默认的保存密码功能，你可以在输入框前边再加一个隐藏的输入框就去掉了该功能 -->
                <input type="text" style="display:none" />
                <vuer-input v-model="email" name="email" placeholder="请输入用户名"></vuer-input>
                <input type="text" style="display:none" />
                <vuer-input
                    v-model="password"
                    show-password
                    name="password"
                    type="password"
                    placeholder="请输入密码"
                ></vuer-input>
                <dl class="login-password-readme">
                    <dd class="remember-password">
                        <span>记住密码</span>
                        <vuer-switch v-model="isRememberPwd"></vuer-switch>
                    </dd>
                    <!-- TODO: 到密码重置页面, 设计密码重置路由 -->
                    <router-link class="forgot" to="/password-reset">
                        <label>忘记密码?</label>
                    </router-link>
                </dl>

                <vuer-button plain type="primary">登录</vuer-button>
            </form>
            <p class="login-callout">
                没有注册?
                <router-link to="/register">注册一个账号</router-link>
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import {encode, decode} from "js-base64"
// vue项目实现记住密码功能 https://www.cnblogs.com/mica/p/10879554.html
import Cookies from "js-cookie"
// 为防止恶意注册. 而人机验证需要收费, 拟采用邮箱验证, 超过时间不激活则账户自动
// 删除的办法.
import {useRouter} from "vue-router"
import {useField, useForm} from "vee-validate"
import { validateEmail, validatePassword} from "../../validate/"
import {postData} from "../../utils"

import {defineComponent, watchEffect, ref, onMounted} from "vue"
export default defineComponent({
    name: "login",
    props: {},
    setup() {
        const rememberPwdExpires = 7 // 记住密码的过期时间 7 天
        const tokenExpires = 7 // token 的过期时间 7 天

        const router = useRouter() // 本页面有处理路由跳转

        const errorMessage = ref()
        const {handleSubmit, errors} = useForm()
        
        // 注册表达提交服务器的有2个域, 记住密码是保存的本地cookie中的
        const {value: email} = useField("email", validateEmail())
        const {value: password} = useField("password", validatePassword())
        // 懒得每次都输入, 先设定一个默认值再说, 实际使用时去掉
        email.value = "zzr@163.com"
        password.value = "123456"

        //! Cookies 里的 false 是字符串, 需要用 JSON.parse 才能转成 布尔值, 不是用 Boolean 来转的
        const isRememberPwd = ref(false)
        //!!! https://juejin.cn/post/6844904182357426190 新版vue-router的hooks用法
        onMounted(() => {
            // 这里是取出 cookies 中的 是否记住密码状态, 保存密码是在 提交的时候进行的, 并进行base64加密
            const cookieHasIsRemberPwd = Cookies.get("isRememberPwd")
            if (cookieHasIsRemberPwd) {
                isRememberPwd.value = JSON.parse(cookieHasIsRemberPwd)
            }

            watchEffect(() => {
                // 保存这个状态到 cookie
                Cookies.set("isRememberPwd", JSON.stringify(isRememberPwd.value), {expires: rememberPwdExpires})
                // 设置 false 时 会清除密码
                if (!isRememberPwd.value) {
                    Cookies.remove("email", {path: ""})
                    Cookies.remove("password", {path: ""})
                }
            })

            const emailInCookies = Cookies.get("email")
            const passwordInCookies = Cookies.get("password")
            // 如果 Cookies 里已经有了 email 和 password, 就解码出来
            if (isRememberPwd.value && emailInCookies && passwordInCookies) {
                email.value = decode(emailInCookies)
                password.value = decode(passwordInCookies)
            }
        })

        const onSubmit = handleSubmit(async (values) => {
            alert(JSON.stringify(values))
            if (isRememberPwd.value) {
                Cookies.set("email", encode(values.email), {expires: rememberPwdExpires}) // 有效期 7 天
                Cookies.set("password", encode(values.password), {expires: rememberPwdExpires})
            }

            const res = await postData("/login", values)

            if (res.message) {
                errorMessage.value = res.message
                return
            }
            if (res.token) {
                // 只有 token 这一种情况才跳转 home 页, 其余情况都到 登录页
                // localStorage.setItem('token', 'Bearer ' + res.token)
                // 改在 Cookies中保存, 设置 expires 属, 否则就是 session 会话期间有效
                Cookies.set("token", "Bearer " + res.token, {expires: tokenExpires})
                // console.log(ctx.$router)
                // 这里实现了3秒后路由的跳转
                setTimeout(() => {
                    router.push("/home")
                }, 1000)
            } else {
                // console.log(res)
                // 如果前端拿到状态码为401，就清除token信息并跳转到登录页面
                // localStorage.removeItem('token')
                Cookies.remove("token", {path: ""})
                router.push("/login")
            }
        })
        return {onSubmit, email, password, errors, errorMessage, isRememberPwd}
    }
})
</script>

<style lang="scss" scoped>
$error-border-color: #f97583; // 定义变量
$error-background-color: #ffeef0; // 定义变量
$width-container: 24rem; // 响应式布局宽度设置为 18rem
.login {
    // 父级容器, 代表整个页面
    width: 100%;
    height: 100%;

    .container {
        width: $width-container;
        // width: 100%;
        @include media("<=small") {
            width: 14rem;
        }
        @include media(">small", "<=medium") {
            width: 20rem
        }
        height: 100%;
        // border: 1px solid red;
        display: flex;
        flex-direction: column;
        margin: auto; // 水平居中
        align-items: center;

        // 登录 标题
        h2 {
            font-size: 1.75rem;
            margin-top: 1rem;
        }

        // 输入框, 输入框大小在 ui input.vue 里可以调整
        .#{$prefix}input {
            width: 100%;
            margin-top: 1.75rem;
        }

        .error {
            $error-padding: 6px;
            position: absolute;
            border: 1px solid $error-border-color;
            background-color: $error-background-color;
            display: flex;
            justify-content: start;
            align-items: center;
            width: calc(#{$width-container} - #{$error-padding} * 2);
            height: 45px;
            top: 12.5rem;
            // margin-top: 6px;
            border-radius: 4px;
            padding: $error-padding;
            visibility: hidden;
            z-index: 2;

            &.error-show {
                visibility: visible;
            }
        }

        .login-password-readme {
            display: flex;
            width: 100%;
            height: 45px;
            margin-top: 1rem;
            font-size: 0.8rem;
            justify-content: space-between;
            align-items: center;
            // border: 1px solid red;

            .remember-password {
                // 记住密码的样式
                display: flex;
                // justify-items: center;
                align-items: center;
                margin-left: 6px;

                > :last-child {
                    // 直接后代选择器 >
                    margin-left: 12px;
                }
            }

            .forgot {
                // display: inline-block;
                text-align: right;

                label {
                    cursor: pointer;
                }
            }
        }

        // 忘记密码 标签

        .#{$prefix}button {
            width: 100%;
            margin-top: 1rem;
        }

        // 没有注册, 注册一个账号 的文字样式
        .login-callout {
            // 内边距 padding 会把宽度撑开, 所以宽度 - 2个 padding 宽
            // width: calc(100% - 40px);
            width: calc(100% - 40px);
            margin-top: 1.75rem;
            line-height: 2rem;
            background: #ffffff;
            color: #606266;
            border: 1px solid #dcdfe6;
            padding: 8px 20px;
            font-size: 1rem;
            border-radius: 4px;
            text-align: right;
        }
    }
}
</style>
