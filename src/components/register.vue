<template>
  <div class="main">
    <el-card class="box-card">

      <el-form ref="formData" :model="formData" :rules="rules" size="medium" label-width="100px" class="login-box">
        <h3 class="login-title">注册</h3>

        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名" clearable prefix-icon='el-icon-s-custom'>
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" placeholder="请输入密码" clearable show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="spassword">
          <el-input v-model="formData.spassword" placeholder="请输入确认密码" clearable show-password></el-input>
        </el-form-item>

        <el-form-item  class="button" label-width="0">
          
              <el-button type="success" @click="toLogin" class="el-icon-back" >返回登录</el-button>
             
          
              <el-button type="primary" @click="submitForm" >注册</el-button>
             
              <el-button @click="resetForm('formData')" id="reset">重置</el-button>
         
          
        </el-form-item>

      </el-form>

    </el-card>
  </div>
</template>
<script>
  import {register} from'@/api/user'
  import router from '../router';
export default {
  components: {},
  props: [],
  data() {
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.formData.spassword !== '') {
            this.$refs.formData.validateField('spassword');
          }
          if(value.length<6){
            callback(new Error('请输入长度大于6的密码'));
          }
          callback();
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formData.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
    return {
      formData: {
        username: '',
        register: '',
        password: '',
        spassword: '',
      },
      rules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          validator: validatePass,
          trigger: 'blur'
        }],
        spassword: [{
          required: true,
          validator: validatePass2,
          trigger: 'blur'
        }],
      },
    }
  },

  methods: {
    submitForm() {
      this.$refs['formData'].validate(valid => {
        let check =true;
        if(this.formData.password!=this.formData.spassword){
          this.$message.error("两次密码不一致!");
          check=false;
        }
        if (check) {
          //  console.log(this.form)
          register(this.formData).then((res) => {
            if (res.code == 200) {
              this.$router.push("/");
              this.$message.success("注册成功");
            } else {
              this.$message.error(res.msg);
            }
          }).catch(function (error) {
            console.log(res.msg)
          });
        }
      })
    },
   
    resetForm() {
      this.$refs['formData'].resetFields()
    },
    toLogin(){
      router.push({
        path:'/'
      })
    }
  }
}

</script>
<style lang="scss" scoped>
@import '../assets/css/login.scss';


.button{

  
  #reset{
  // width: 30%;
  text-align: right;
  #reset{
    color: #606266 !important ;
  }
}
#register{
  // width: 30%;
  text-align: center;
  
}
#back{
  width: 30%;
  text-align: left;
}
}

</style>
