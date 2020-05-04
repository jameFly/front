
<script>
    import { UserAPI } from "@/api/User";
    export default {
        name: "login",
        components: {},
        data(){
            return {
                loginFormData: {
                    name: '',
                    password: '',
                },
                url: require('./logo.png')
            }
        },
        methods:{
            login() {
                const loginFormData = {...this.loginFormData};
                console.log(loginFormData);
                if (loginFormData.name && loginFormData.password) {
                    setTimeout(() => {location.href = '/dishManagement'}, 1000)
                    // UserAPI.login(loginFormData).then(res => {
                    //     console.log('res',res);
                    //     if (res.data.status == 0) {
                    //
                    //     } else {
                    //         if (res.data.errorCode) {
                    //             this.$message.error(res.data.errorCode);
                    //         }
                    //     }
                    // }).catch(err => {
                    //     console.log('err',err)
                    // })
                } else {
                    this.$message.error("用户名或密码不能为空！");
                }
            },
        },
        render(h){
            const {loginFormData, url} = this;
            return(
                <div class="t-login">
                    <div class="t-content-box">
                        <div class="t-logo">
                            <el-image class="collapsed-logo" src={url}/>
                            <div class="t-logo-title">菜品管理系统</div>
                        </div>
                        <div class="t-form">
                            <div class="t-login-form">
                                <el-form ref="form" {...{props: {modal: loginFormData}}} label-width="50px" class="login-form">
                                    <el-form-item label={"帐号"}>
                                        <el-input
                                            class="login-form-input"
                                            v-model={loginFormData.name}
                                            placeholder={"请输入帐号"}
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item label={"密码"}>
                                        <el-input
                                            class="login-form-input"
                                            v-model={loginFormData.password}
                                            placeholder={"请输入密码"}
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button class="login-button" on-click={this.login} >登录</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
</script>

<style lang="scss">
.t-login{
    display: flex;
    width: 100%;
    height: calc(100vh);
    flex-direction: column;
    justify-content: center;
    background-color: #1C2B3F;
    .t-content-box{
        min-height: calc(100vh);
        .t-logo {
            text-align: center;
            margin: 20px;
            .collapsed-logo{
                width: 150px;
                height: 150px;
            }
            .t-logo-title {
                font-size: 30px;
                color: #F1F3F8;
                text-align: center;
                margin-bottom: 20px;
            }
        }
        .t-form {
            background:url('./form-bgp.png');
            .t-login-form{
                display: flex;
                justify-content: center;
                width: 400px;
                height: 300px;
                margin: 50px auto;
                padding: 50px;
                label{
                    color: #fff;
                    font-size: 16px;
                }
                .login-form-input{
                    width: 210px;
                }
                .login-button,.login-button:hover{
                    font-size: 18px;
                    color: #fff;
                    width: 100%;
                    background: #f90;
                }
            }
            .t-edit-password{
                font-size: 16px;
                color: #fff;
            }
        }
    }
}
</style>