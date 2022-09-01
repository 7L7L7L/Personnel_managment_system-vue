<template>
  <div class="main">
    <el-card class="box-card">
      <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
        <h3 class="login-title">欢迎 登录</h3>
        <el-form-item label=" 账号" prop="username">
          <el-input type="text" placeholder="请输入账号" v-model="form.username" />
        </el-form-item>
        <el-form-item label=" 密码" prop="password">
          <el-input type="password" placeholder=" 请输入密码" v-model="form.password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="onSubmit('loginForm')">登录</el-button>
          <el-button @click="register" id="register">注册</el-button>
        </el-form-item>
      </el-form>
      <el-dialog title="温馨提示" :visible.sync="dialogVisible" width="80%">
        <!-- :before-close="handLeClose" -->
        <span>请输入账号和密码</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">确定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
  <script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      //表单验证，需要在el-form-item 元素中增加prop 属性
      rules: {
        username: [
          { required: true, message: " 账号不可为空", trigger: 'blur' }
        ],
        password: [
          { required: true, message: " 密码不可为空 ", trigger: 'blur' }
        ]
      },
      //对话框显示和隐藏
      dialogVisible: false
    }
  },
  methods: {
    onSubmit(formName) {
      //为表单绑定验证功能
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //使用vue-router路由到指定页面，该方式称之为编程式导航
          this.$router.push("/home");
        } else {
          this.dialogVisible = true;
          return false;
        }
      });
    },
    register() {
      this.$router.push({ path: '/register' })
    },
  }
}
</script>

<style lang="scss" scoped>
// .main {
//   background: url('../static/background.jpg') no-repeat;
//   background-size: cover;
//   height: 100%;

//   .box-card {
//     // height: 650px;
//     width: 480px;
//     position: relative;
//     top: 50%;
//     transform: translateY(-50%);
//     margin: 0 auto 40px;
//     background-image: url('../static/cardbackground.jpg');
//     // background-color:aqua;
//     // padding: 180px 0;

//     .login-box {
//       border: 1px solid #DCDFE6;
//       width: 350px;
//       // height: 100%;
//       margin: 100px auto;
//       padding: 35px 35px 15px 35px;
//       border-radius: 5px;
//       -webkit-border-radius: 5px;
//       -moz-border-radius: 5px;
//       box-shadow: 0 0 25px #909399;
//       background-color: aliceblue;
//       // position: relative;
//       // top: 50%;
//       // transform: translateY(-50%);
//       #register {
//         color: #606266 !important;
//       }
//     }

//   }
// }

// .login-title {
//   text-align: center;
//   margin: 0 auto 40px auto;
//   color: #303133;
// }
@import '../assets/css/login.scss';
</style>