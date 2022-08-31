<template>
  <div>
    <el-row :gutter="15">
      <el-form ref="loginForm" :model="formData" :rules="rules" size="medium" label-width="100px">
        <el-row :span="12">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="formData.username" placeholder="请输入用户名" clearable
              prefix-icon='el-icon-s-custom' :style="{width: '50%'}"></el-input>
          </el-form-item>
        </el-row>
        <!-- <el-col :span="5">
      <el-form-item label="" prop="register">
        <el-button type="primary" icon="el-icon-plus" size="medium"> 注册 </el-button>
      </el-form-item>
    </el-col> -->
        <el-row :span="12">
          <el-form-item label="密码" prop="field102">
            <el-input v-model="formData.field102" placeholder="请输入密码" clearable show-password
              :style="{width: '50%'}"></el-input>
          </el-form-item>
        </el-row>
        <el-row :span="12">
          <el-form-item label="确认密码" prop="field109">
            <el-input v-model="formData.field109" placeholder="请输入确认密码" clearable show-password
              :style="{width: '50%'}"></el-input>
          </el-form-item>
        </el-row>
        <el-row :span="24">
          <el-form-item size="large">
            <el-button type="primary" @click="submitForm">注册</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-row>
  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      formData: {
        username: undefined,
        register: undefined,
        field102: undefined,
        field109: undefined,
      },
      rules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        field102: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
        field109: [{
          required: true,
          message: '请输入确认密码',
          trigger: 'blur'
        }],
      },
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      this.$refs['loginForm'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
      })
    },
    resetForm() {
      this.$refs['loginForm'].resetFields()
    },
  }
}

</script>
<style>
</style>
