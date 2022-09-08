<template>
  <div>
    <h1>修改个人信息</h1>
  <!-- <el-form :model="personInfo" ref="personInfo" >
        <el-form-item label="工号:" prop="uuid">
          {{ personInfo.uuid }}

        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="姓名:" prop="employeeName">
          {{ personInfo.employeeName }}

        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="性别:" prop="employeeSex">
          {{ personInfo.employeeSex }}
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="部门:" prop="departmentName">
          {{ personInfo.departmentName }}
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="电话号:" prop="employeeTelephone">
          {{ personInfo.employeeTelephone }}
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="地址:" prop="employeeAddress">
          {{ personInfo.employeeAddress }}
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="照片:" prop="pictureUrl">
          <el-button type="primary" @click="getpicture">确定</el-button>
          <img :src="personInfo.pictureUrl" class="avatar">
        </el-form-item>
      </el-form> -->
  </div>
  
</template>
  <script>
export default {
  data:{
    return:{
      personInfo:[]
    }
  }
}
</script>
  <style scoped>
  </style>
  