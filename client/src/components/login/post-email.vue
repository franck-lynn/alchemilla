<template>
    <div class="password-reset">
        <div class="container">
            <div class="header header-password-reset" role="banner">
                <router-link to="/password-reset">
                    <span class="iconfont icon-MPIS-ResetPassword"></span>
                </router-link>
                <h2>密码重置</h2>
            </div>

            <!-- 当忘记密码时跳转到发送页面 -->
            <span :class="['error', {'error-show': JSON.stringify(errors) !== '{}'}]">
                {{ errors.email || errors.password }}
            </span>
            <div v-if="!flag" class="password-reset-form">
                <label for="email_field">
                    输入您的用户帐户的已验证电子邮件地址，我们将向您发送密码重置链接.
                </label>

                <form @submit.prevent="onSubmit">
                    <!-- 如果你不想要浏览器默认的保存密码功能，你可以在输入框前边再加一个隐藏的输入框就去掉了该功能 -->
                    <input type="text" style="display:none" />
                    <vuer-input id="email_field" v-model="email" name="email" placeholder="电子邮件地址"></vuer-input>
                    <vuer-button plain type="primary">发送密码重置链接邮件</vuer-button>
                </form>
            </div>
            <!-- 当发送完密码重置邮件后, 提示用户登录 -->
            <div v-if="flag" class="password-reset-info">
                <p>
                    Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check
                    your spam folder.
                </p>
                <router-link to="/login">Return to sign in</router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
// 这是密码重置后提示用户登录的界面, 如果用户已经发送邮件, 在邮件中给一个这个页面的链接
import {useField, useForm} from "vee-validate"
import {validateEmail} from "../../validate/"
import {postData} from "../../utils"
import {defineComponent, ref} from "vue"
export default defineComponent({
    name: "post-email",
    props: {
        hasToken: {type: Boolean, default: false}
    },
    setup() {
        const flag = ref(false)

        const {handleSubmit, errors} = useForm()
        const {value: email} = useField("email", validateEmail())

        email.value = "zm@163.com"
        const onSubmit = handleSubmit(async (values) => {
            // 提交给服务器, 让服务器处理后发送邮件给客户端, 这里提交时没有带 token, 所以, 在路由中, 走的是
            // else 通道, 获取的是 value = email
            const res = await postData("/password-reset", values)
            if (res.msg) {
                flag.value = true
            }
            console.log("post-email.vue 文件报告 ---> ", res)
        })
        return {flag, onSubmit, email, errors}
    }
})
</script>

<style lang="scss" scoped>
$error-border-color: #f97583; // 定义变量
$error-background-color: #ffeef0; // 定义变量
$width-container: 24rem; // 响应式布局宽度设置为 18rem
$width-padding-password-reset: 1.2rem;
.password-reset {
    // 父级容器, 代表整个页面
    width: 100%;
    height: 100%;

    .container {
        width: $width-container;
        height: 100%;
        // border: 1px solid red;
        display: flex;
        flex-direction: column;
        margin: auto; // 水平居中
        align-items: center;

        .header {
            display: flex;
            justify-content: center;
            width: 100%;
            margin-top: 8rem;
            // border: 1px solid blue;
            align-items: center;
            .iconfont {
                height: 100%;
                font-size: 2rem;
                width: 4rem;
                // border: 1px solid red;
                margin-right: 1rem;
            }
            h2 {
                height: 100%;
            }
        }

        .password-reset-form,
        .password-reset-info {
            width: calc(100% - #{$width-padding-password-reset} * 2);
            // border: 1px solid blueviolet;
            white-space: normal;
            margin-top: 1.2rem;
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
                display: flex; // 重置成功后的界面
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
            height: 30px;
            top: 13rem;
            // margin-top: 6px;
            border-radius: 4px;
            padding: math.div($width-padding-password-reset , 2) $width-padding-password-reset;
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
