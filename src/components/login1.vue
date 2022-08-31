<template>
  <div class="loginform">
    <el-row :gutter="15">
      <el-form ref="loginForm" :model="formData" :rules="rules" size="medium" label-width="100px">
        <el-row :span="12">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="formData.username" placeholder="请输入用户名" clearable
              prefix-icon='el-icon-s-custom' :style="{width: '50%'}"></el-input>
          </el-form-item>
        </el-row>
        <el-row :span="12">
          <el-form-item label="密码" prop="password">
            <el-input v-model="formData.password" placeholder="请输入密码" clearable show-password
              :style="{width: '50%'}"></el-input>
          </el-form-item>
        </el-row>
        <el-col :span="24" >
          <el-form-item size="large" ref="login">
            <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
            <el-button @click="resetForm" >注册</el-button>
          </el-form-item>
          <!-- <el-form-item size="large" ref="register">
          
          </el-form-item> -->
        </el-col>
      </el-form>
    </el-row>
    <el-dialog title="温馨提示" 
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
  <span>请输入账号和密码</span>
  <span slot="footer" class="dialog-footer">
    <el-buttom type="primary" @click="dialogVisible=false" value="确定">确定</el-buttom>
  </span>
  </el-dialog>
  <el-dialog title="温馨提示" 
    :visible.sync="dialogVisible1"
    width="30%"
    :before-close="handleClose">
  <span>账号密码错误</span>
  <span slot="footer" class="dialog-footer">
    <el-buttom type="primary" @click="dialogVisible1=false" value="确定">确定</el-buttom>
  </span>
  </el-dialog>
  </div>
</template>
<script>
export default {
  name:'login',
  components: {
  },
  props: [],
  data() {
    return {
      formData: {
        username: undefined,
        register: undefined,
        field102: undefined,
        login: undefined,
      },
      rules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
      },
      dialogVisible:false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      this.$refs['loginForm'].validate(valid => {
        if(this.password==2){
         this.valid=true
        }
        if (valid){
          this.$router.push( { path :'/hello'})
        }else{
          if(this.password==null||this.username==null){
            this.dialogVisible=true;
          }else if(this.password==1){
            this.dialogVisible1=true;
            
          }
            return false;
        } 
        
      })
    },
    resetForm() {
      this.$router.push( { path :'/register'})
    },
  }
}

</script>
<style>
  
  #register{
      color: #000;
  }
</style>
