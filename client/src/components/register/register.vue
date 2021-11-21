<template>
    <div class="page-production">
        <router-link to="/index" class="login">首页</router-link>
        <router-link to="/login" class="login">登录</router-link>
    </div>

    <div class="register">
        <div class="container">
            <div class="header header-register" role="banner">
                <register-logo class="register-logo"></register-logo>
                <div class="register-text">
                    <span>加入成员</span>
                    <h2>创建您的账户</h2>
                </div>
            </div>
            <form @submit.prevent="onSubmit">
                <dl class="form-group my-3 required errored">
                    <dd>
                        <!-- 键盘输入允许小写和数字, @keyup="name = name.replace(/[^a-z0-9_]/g, '')" -->
                        <vuer-input v-model="name" name="name" placeholder="用户名"></vuer-input>
                    </dd>
                    <dd v-if="nameError" id="input-check-name" class="error">
                        <span class="mb">{{ nameError }}</span>
                    </dd>
                </dl>
                <dl class="form-group my-3 required errored">
                    <dd>
                        <!-- 邮箱采用小写输入 -->
                        <!-- @keyup="email = email ? email.replace(/[^\a-\z\A-\Z0-9\@\.\_\-]/g, '') : undefined" -->
                        <vuer-input
                            v-model="email"
                            name="email"
                            placeholder="电子邮件地址"
                            @keyup="handleKeyupEmail"
                        ></vuer-input>
                    </dd>
                    <!-- onbeforepaste https://blog.csdn.net/badao_liumang_qizhi/article/details/96430699 -->
                    <!-- @beforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^a-zA-Z]/g,''))" -->

                    <dd v-if="emailError" id="input-check-name" class="error">
                        <span class="mb">{{ emailError }}</span>
                    </dd>
                </dl>
                <dl class="form-group my-3 required errored">
                    <dd>
                        <!-- 输入框禁止使用输入法 https://majing.io/questions/320 -->
                        <vuer-input
                            v-model="password"
                            name="password"
                            type="password"
                            placeholder="请输入密码"
                            show-password
                            @keyup="handleKeyupPassword"
                        ></vuer-input>
                    </dd>
                    <dd v-if="passwordError" id="input-check-name" class="error">
                        <span class="mb">{{ passwordError }}</span>
                    </dd>
                </dl>

                <password-readme></password-readme>

                <vuer-button plain type="primary" @click="onSubmit">创建账户</vuer-button>
            </form>
        </div>
    </div>

    <vuer-dialog v-if="showMsg" v-model="showMsg" :title="title" :width="width">
        <template #default>
            {{ msg.msg }}
        </template>
    </vuer-dialog>
</template>

<script lang="ts">
import {postData} from "../../utils"
import {validateName, validateEmail, validatePassword} from "../../validate/"
//! https://logaretm.com/blog/2020-05-06-the-case-for-hoc-vs-composition-api/
import {useField, useForm} from "vee-validate"
// import { useI18n } from 'vue-i18n'
import {defineComponent, ref} from "vue"
export default defineComponent({
    name: "register",
    props: {},
    setup() {
        // const { t } = useI18n()
        const title = "服务器端返回的信息:"
        const width = 400 + "px"
        const showMsg = ref()
        const msg = ref()
        // 验证部分
        //! 这是使用 schema 的情况, schema 是所有字段验证的集合, 指定那个 form 表单需要验证

        const {handleSubmit} = useForm()
        //! useField() 方法使用了这个 form, 指定这些字段是属于哪个 form
        //! schema 还是需要定义的
        const {value: name, errorMessage: nameError} = useField("name", validateName())
        const {value: email, errorMessage: emailError} = useField("email", validateEmail())
        const {value: password, errorMessage: passwordError} = useField("password", validatePassword())

        name.value = "周芷若"
        email.value = "zzr@163.com"
        password.value = "123456"

        //! 如果点击提交事件不能触发, 则应该是 locale-changer.vue 里的取消菜单事件阻止了冒泡
        const onSubmit = handleSubmit(async (values) => {
            alert("注册提交之前校验, 加密" + JSON.stringify(values))
            msg.value = await postData("/register", values)
            showMsg.value = msg.value ? true : false
        })

        const handleKeyupPassword = (e: Event) => {
            // 从键盘控制 密码框只能输入 acsii 字符
            let str = (e.target as HTMLInputElement).value
            let temp = ""
            for (let i = 0; i < str.length; i++) {
                if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 255) temp += str.charAt(i)
            }
            return ((e.target as HTMLInputElement).value = temp)
        }
        const handleKeyupEmail = () => {
            // eslint-disable-next-line no-useless-escape
            email.value = email.value? (email.value as string).replace(/[^\a-\z\A-\Z0-9\@\.\_\-]/g, '') : undefined
        }
        return {
            onSubmit,
            name,
            nameError,
            email,
            emailError,
            password,
            passwordError,
            handleKeyupPassword,
            handleKeyupEmail,
            title,
            width,
            showMsg,
            msg
        }
    }
})
</script>

<style lang="scss" scoped>
$height-icon-btn: 45px; // 把导航栏的高度空出来, 这样页面内容就不会被导航栏遮住了
$width-container: 24rem;
// ========最顶端水平菜单栏, 与index页面相同的css, 开始 =======
.page-production {
    height: $height-icon-btn;
    width: 100%;
    display: flex;
    background-color: #eee;
    justify-content: flex-end;
    // justify-content: center;
    align-items: center;
}
.login {
    margin-right: 0.5rem; // 水平菜单栏的左外边距(注册, 登录文字距离右边距离)
}
// ========最顶端水平菜单栏, 与index页面相同的css, 结束 =======
.register {
    width: 100%;
    height: calc(100% - #{$height-icon-btn}); // 注册框的高度
    .container {
        width: $width-container;
        @include media("<=small") {
            width: 14rem;
        }
        @include media(">small", "<=medium") {
            width: 20rem;
        }
        height: 100%;
        // border: 1px solid red;
        display: flex;
        flex-direction: column;
        margin: auto; // 水平居中
        align-items: center;

        form,
        dl,
        dd,
        .form-group {
            width: 100%;
        }

        // svg person 图标
        .header {
            display: flex;
            justify-content: center;
            width: 100%;
            margin-top: 6rem;
            // border: 1px solid red;

            .register-logo {
                display: flex;
                align-items: center;
                // border: 1px solid blue;
                height: 100%;
                width: 4rem;
                margin-right: 2rem;
            }
            // 注册 标题, 加入成员这行字默认
            h2 {
                font-size: 1.75rem; // 创建您的账户 这行字的大小
                margin-top: 1rem;
                @include media("<=small") {
                    font-size: 1.25rem;
                    margin-top: 0.8rem;
                }
            }
        }

        // 输入框, 输入框大小在 ui input.vue 里可以调整
        .form-group {
            margin-top: 1.75rem;
            // padding-bottom: 0.75rem;
            .#{$prefix}input {
                width: 100%;
            }

            .error {
                $little-triangle-width: 6px; // 定义变量
                $border-color: #f97583; // 定义变量
                $background-color: #ffeef0; // 定义变量
                $little-triangle-left: 6px;
                $error-padding: 6px;
                $height-error: 26px;

                width: calc(#{$width-container} - 2 * #{$error-padding});
                height: $height-error;
                line-height: $height-error;
                border: 1px solid $border-color;
                border-radius: 5px;
                margin-top: 6px;
                padding: $error-padding;
                background-color: $background-color;
                position: absolute;
                z-index: 20;

                &::before {
                    content: ""; // 向上的小三角符号
                    width: 0;
                    height: 0;
                    font-size: 0;
                    line-height: 0;
                    border-width: $little-triangle-width;
                    border-style: dashed dashed solid dashed;
                    border-color: transparent transparent $border-color transparent;
                    position: absolute;
                    left: $little-triangle-left;
                    top: -2 * $little-triangle-width;
                }

                &::after {
                    content: ""; // 向上的小三角符号
                    width: 0;
                    height: 0;
                    font-size: 0;
                    line-height: 0;
                    border-width: $little-triangle-width - 1px;
                    border-style: dashed dashed solid dashed;
                    border-color: transparent transparent $background-color transparent;
                    position: absolute;
                    top: -2 * $little-triangle-width + 2.4px; // 三角形边长的开方
                    left: $little-triangle-left + 1px;
                }
            }
        }

        .#{$prefix}button {
            width: 100%;
            margin-top: 1rem;
        }
    }
}
</style>
