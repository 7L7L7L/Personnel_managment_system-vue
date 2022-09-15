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
          <el-switch v-model="isAdmin" active-color="#13ce66" active-text="是否管理员登录">
          </el-switch>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" v-on:click="onSubmit('loginForm')">登录</el-button>
          <el-button @click="register" id="register">注册</el-button>
        </el-form-item>
      </el-form>
    
    </el-card>
    <el-dialog title="温馨提示" :visible.sync="dialogVisible" width="20%" >
        <!-- :before-close="handLeClose" -->
        <span>请输入账号和密码</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">确定</el-button>
        </span>
      </el-dialog>
  </div>
</template>
  <script>
import { login } from '@/api/user'
export default {
  name: "Login",
  data() {
    return {
      isAdmin: false,
      form: {
        username: '',
        password: '',
        isAdmin: 0
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
          //  console.log(this.form)
          if (this.isAdmin) {
            this.form.isAdmin = 1;
           
            login(this.form).then((res) => {
              if (res.code == 200) {
                sessionStorage.setItem("jwt",res.data.jwt)
                sessionStorage.setItem("id",res.data.id)
                this.$router.push("/managementhome/home");
                this.$message.success("登录成功");
              } else {
                this.$message.error(res.msg);
              }
            }).catch(function (error) {
              console.log(res.msg)
            });
          } else {
            this.form.isAdmin = 0;
            
            login(this.form).then((res) => {
              if (res.code == 200) {
                sessionStorage.setItem("jwt",res.data.jwt)
                sessionStorage.setItem("id",res.data.id)
                this.$router.push("/employeehome/home");
                this.$message.success("登录成功");
              } else {
                this.$message.error(res.msg);
              }
            }).catch(function (error) {
              console.log(res.msg)
            });
          }

        } else {
          this.dialogVisible = true; 
        }
      });
    },
    register() {
      this.$router.push({ path: '/register' })
    },
   
  },

}
</script>

<style lang="scss" scoped>

@import '../assets/css/login.scss';
</style>