<template>
    <div class="change-password">
        <div class="container">
            <div class="header header-change-password" role="banner">
                <div class="change-password-text">
                    <router-link to="/change-password">
                        <span class="iconfont icon-MPIS-ResetPassword"></span>
                    </router-link>
                </div>
            </div>
            <h2>更改密码 @{{ username }}</h2>
            <!-- 当忘记密码时跳转到发送页面 -->
            <span :class="['error', {'error-show': JSON.stringify(errors) !== '{}'}]">{{ errors }}</span>
            <div v-if="!flag" class="change-password-form">
                <label for="password_field">
                    输入密码并确认一次密码，我们将向您发送密码重置链接.
                </label>

                <form @submit.prevent="onSubmit">
                    <!-- 如果你不想要浏览器默认的保存密码功能，你可以在输入框前边再加一个隐藏的输入框就去掉了该功能 -->
                    <input type="text" style="display:none" />
                    <vuer-input
                        id="password_field"
                        v-model="password"
                        name="password"
                        type="password"
                        placeholder="密码"
                    ></vuer-input>

                    <input type="text" style="display:none" />
                    <vuer-input
                        v-model="comfirmPassword"
                        name="comfirmPassword"
                        type="password"
                        placeholder="确认密码"
                    ></vuer-input>
                    <vuer-button plain type="primary">更改密码</vuer-button>
                </form>
            </div>
            <!-- 当发送完密码重置邮件后, 提示用户登录 -->
            <div v-if="flag" class="change-password-info">
                <p>
                    Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check
                    your spam folder.
                </p>
                <router-link to="/login">Return to sign in</router-link>
            </div>
        </div>
    </div>
    <div v-if="flag" class="change-password-info">
        <p>
            Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your
            spam folder.
        </p>
        <router-link to="/login">Return to sign in</router-link>
    </div>
</template>

<script lang="ts">
import {postData} from "../../utils"
//! https://logaretm.com/blog/2020-05-06-the-case-for-hoc-vs-composition-api/
import {useField, useForm} from "vee-validate"
import {validatePassword} from "../../validate/"
// import { useI18n } from 'vue-i18n'
import {defineComponent, getCurrentInstance, ref} from "vue"
export default defineComponent({
    name: "change-password",
    props: {
        username: {type: String, default: ""}
    },
    setup() {
        const flag = ref(false)
        const {handleSubmit, errors} = useForm()
        const {value: password} = useField("password", validatePassword())
        const {value: comfirmPassword} = useField("comfirmPassword", validatePassword())

        // 临时填入表单数据:
        password.value = "aaaaaa"
        comfirmPassword.value = "aaaaaa"

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const {ctx} = getCurrentInstance() as any
        const currentRoute = ctx.$root.$route // 当前的路由 url
        // 当前路由url是否带了口令, 如果带了口令, 说明已经发送过给邮箱链接了
        const currentToken = currentRoute.params && currentRoute.params.token ? currentRoute.params.token : null
        // 获取 参数中的口令
        const onSubmit = handleSubmit(async (values) => {
            // 提交之前校验, 加密
            if(password.value !== comfirmPassword.value){
                return
            }
            alert("更改密码提交之前校验, 加密" + JSON.stringify(values))
            // 这里提交不仅仅是 password, 而且还要带上 token,
            const res = await postData(`/change-password/${currentToken}`, values)
            // console.log("打印改变密码的数据----> ", res.msg, res.username)
            if (res.username) {
                flag.value = true
            }
        })

        return {
            flag,
            errors,
            password,
            comfirmPassword,
            onSubmit
        }
    }
})
</script>

<style lang="scss" scoped>
$error-border-color: #f97583; // 定义变量
$error-background-color: #ffeef0; // 定义变量
$width-container: 24rem; // 响应式布局宽度设置为 18rem
$width-padding-password-reset: 1.2rem;
// svg key 图标
.header {
    margin-top: 6rem;
    .change-password-text {
        $size-iconfont: 4rem;
        width: $size-iconfont;
        height: $size-iconfont;
        .iconfont {
            font-size: $size-iconfont;
            opacity: 0.8;
            &:hover {
                color: #203f5f;
            }
        }
        margin-bottom: 1rem;
        // border: 1px solid red;
    }
    svg {
        opacity: 0.5;

        &:hover {
            fill: #203f5f;
        }
    }
}

.change-password {
    // 父级容器, 代表整个页面
    width: 100%;
    height: 100%;

    .container {
        width: $width-container;
        height: 100%;
        // border: 1px solid red;
        display: flex;
        flex-direction: column;
        margin: auto;
        align-items: center;

        .change-password-form,
        .change-password-info {
            width: calc(100% - #{$width-padding-password-reset} * 2);
            // border: 1px solid blueviolet;
            white-space: normal;
            margin-top: 30px;
            background-color: #f6f8fa;
            padding: $width-padding-password-reset;
            border-radius: 0.6rem;

            label,
            p {
                display: block;
                white-space: normal;
                text-align: left;
                font-weight: 500;
                font-size: 1.2rem;
                line-height: 1.4rem;
            }

            a {
                display: flex;
                width: 100%;
                margin-top: 2rem;
                height: 45px;
                justify-content: center;
                align-items: center;
                color: #fff;
                border-radius: 4px;
                background-color: #2ea44f;
                font-size: 1.2rem;

                &:hover,
                &:focus {
                    background-color: #2c974b;
                }
            }
        }

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
            position: absolute;
            border: 1px solid $error-border-color;
            background-color: $error-background-color;
            display: flex;
            justify-content: start;
            align-items: center;
            width: calc(#{$width-container} - #{$width-padding-password-reset} * 2);
            height: 45px;
            top: 16.5rem;
            // margin-top: 6px;
            border-radius: 4px;
            padding: math.div($width-padding-password-reset, 2) $width-padding-password-reset;
            visibility: hidden;
            z-index: 2;

            &.error-show {
                visibility: visible;
            }
        }

        .#{$prefix}button {
            width: 100%;
            margin-top: 2rem;
            color: #fff;
            background-color: #2ea44f;

            &:hover,
            &:focus {
                background-color: #2c974b;
            }
        }
    }
}
</style>
