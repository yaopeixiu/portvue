<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">港口运输管理云平台</div>
      <el-form :model="account" :rules="rules" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="account.username" placeholder="username">
            <el-button slot="prepend" icon="el-icon-lx-people">账号</el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="account.pwd" @keyup.enter.native="submitForm('ruleForm')">
            <el-button slot="prepend" icon="el-icon-lx-lock">密码</el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="handleLogin()">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { requestLogin } from "../api/api";

  export default {
      data: function(){
        return {
          logining: false,
          account: {
            username: 'SuperQueen',
            pwd: '123456'
          },
          rules: {
            username: [
              {required: true, message: '请输入账号', trigger: 'blur'}
            ],
            pwd: [
              {required: true, message: '请输入密码', trigger: 'blur'}
            ]
          },
          checked: true
        }
      },
      methods: {
        handleLogin(){
          this.logining = true
          var loginParams = { username: this.account.username, password: this.account.pwd }
          console.log(this.account.username,this.account.pwd)
          requestLogin(loginParams).then((data) => {
            this.logining = false
            console.log(data)
			  try{
				  if (data.errno == 0) {
					  this.$message({
						  type: 'success',
						  message: "登陆成功",
					  });
					  this.$router.push({ path: '/manage' })
				  }else{
					  throw new Error(data.errmsg)
				  }}catch(err){
				  this.$message({
					  type: 'error',
					  message: "登录失败！"
				  });
				  console.log('登录失败！')
			  }
            // let { code, userid } = data
            // if (code === 200) {
            //   // 登录成功，把用户信息保存在sessionStorage中
            //   sessionStorage.setItem('userid', userid)
            //   sessionStorage.setItem('username',this.account.username)
            //   // 跳转到主界面
            //   this.$router.push({ path: '/home' })
            // } else {
            //   this.$message({
            //     message: '登录失败',
            //     type: 'error'
            //   })
            //   // this.$router.push({ path: '/Register' })
            // }
          })
        }
      }
    }
</script>

<style scoped>
  .login-wrap{
    position: relative;
    width:100%;
    height:100%;
    background-image: url(../assets/images/login_1.png);
    background-size: 100%;
  }
  .ms-title{
    width:100%;
    line-height: 50px;
    text-align: center;
    font-size:20px;
    /*color: #fff;*/
    color: #2c3e50;
    border-bottom: 1px solid #ddd;
  }
  .ms-login{
    position: absolute;
    left:50%;
    top:50%;
    width:350px;
    margin:-190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255,255,255, 0.3);
    overflow: hidden;
  }
  .ms-content{
    padding: 30px 30px;
  }
  .login-btn{
    text-align: center;
  }
  .login-btn button{
    width:100%;
    height:36px;
    margin-bottom: 10px;
  }
</style>
