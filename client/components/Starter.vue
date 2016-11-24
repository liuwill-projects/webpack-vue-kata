<template>
<div class="main-container">
    <div class="login-card cover">
        <el-card :body-style="{ padding: '0px' }" class="view-card">
            <div src="" class="hero-img"></div>
            <div style="padding: 12px;">
                <p>{{userStatus}}</p>
                <el-form label-position="top" :model="loginForm" :rules="loginRule" ref="loginForm" class="login-box">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="loginForm.password"></el-input>
                    </el-form-item>
                    <el-form-item label="图形验证码" prop="imageCode">
                        <el-input v-model="loginForm.imageCode"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click.native.prevent="login">登录</el-button>
                        <el-button @click.native.prevent="register">注册</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</div>
</template>

<script>
import {userModule} from '../modules/user.module';

export default {
    data() {
        return {
            me: {name:"liuwill"},
            editStatus:true,
            loginForm: {
                username: '',
                password: '',
                imageCode: '',
            },
            loginRule:{
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 255, message: '长度在 6 到 18 个字符', trigger: 'blur' },
                ],
                imageCode: [
                    { required: true, message: '请输入图形验证码', trigger: 'blur' },
                    { min: 6, max: 6, message: '长度在 6 个字符', trigger: 'blur' },
                ],
            }
        }
    },
    computed: {

    },
    created () {
        // 组件创建完后获取数据，
        // 此时 data 已经被 observed 了
        this.fetchData()
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        '$route': 'fetchData'
    },

    methods: {
        fetchData(){
            console.log("fetch data");
        },
        jumpTo(pathName){
            this.$router.push({name: pathName});
        },
        register(){
            this.jumpTo("register");
        },
        login(){
            let _component = this;
            let _loginForm = this.loginForm;

            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    userModule.login(_loginForm,function(resData){
                        if(resData.status !== 0){
                            _component.$message({
                                type: 'info',
                                message: '登录失败:' + resData.msg
                            });
                        }else{
                            userModule.fetchUser({id:resData.data},function(jsonData){
                                window._UserData = jsonData.data
                                _component.$alert(`账号登录成功`, '登录', {
                                    callback: action => {
                                        _component.$router.push({name:'dashboard'})
                                    }
                                });
                            });
                        }
                    });
                }else{
                    return false;
                }
            });
        }
    }
}
</script>

<style scoped>
body, html {
    width: 100%;
    height: 100%;
}

.hero-img{
    width: 320px;
    height: 200px;
    max-width: 100%;
    max-height: 100%;
    background-size:cover;
    background-position: 0;
    background-repeat: no-repeat;
    transition: all 1s ease-in-out;
    background-image:url(http://ogkm9qw4b.bkt.clouddn.com/images/site/cover.png);
}
.hero-img:hover{
    background-position: 100%;
}

.main-container{
    background-color: rgb(246, 246, 246);

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.login-card{
    position: fixed;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%,-50%);
    -khtml-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
}
.text-center{
    text-align: center;
}

.login-card.cover:hover{
    -webkit-box-shadow: 0 4px 16px rgba(0,0,0,0.36);
    box-shadow: 0 4px 16px rgba(0,0,0,0.36);
}
.login-box{
    width:280px;
}
</style>