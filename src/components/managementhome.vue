<template>
  <div>
    <el-container>
      <el-aside width="200px" class="el-aside">
        <el-menu :default-openeds="['1','2']">



          <el-submenu index="1">
            <template slot="title"><i class="el-icon-user-solid"></i>部门管理</template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <!--插入的地方-->

                <el-link type="primary" @click="toDepartmentManagement()">部门列表</el-link>
              </el-menu-item>
              <el-menu-item index="1-2">
                <!--插入的地方-->

                <el-link type="success" @click="toEmployeeManagement()">员工列表</el-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-s-management"></i>内容管理</template>
            <el-menu-item-group>
              <el-menu-item index="2-1">
                <el-link type="info" @click="toHolidayManagement()">请假列表</el-link>
              </el-menu-item>
              <el-menu-item index="2-2">
                <el-link type="warning" @click="toOvertimeManagement()">加班系统</el-link>
              </el-menu-item>
              <el-menu-item index="2-3">
                <el-link type="danger" @click="toSalaryManagement()">工资列表</el-link>
              </el-menu-item>

            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>




      <el-container>
        <el-header style=" font-size: 12px" class="el-header" title="欢迎使用人事管理系统--管理端">

          <el-button type="primary" class="el-icon-back" @click="tohome()">回主页</el-button>


          <el-dropdown id="drop">
            <el-button type="primary" class="el-icon-setting">
              更多功能<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button class="el-icon-thumb" @click="handleExit()">退出登录</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button class="el-icon-thumb" @click="updateDialogVisible = true">修改密码</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>



        </el-header>
        <el-main>
          <!--在这里展示视图-->
          <router-view />
        </el-main>

      </el-container>



    </el-container>
    <el-dialog title="修改密码" :visible.sync="updateDialogVisible" width="25%" :before-close="handLeClose">

      <el-form :model="updateForm" status-icon :rules="rules" ref="updateForm" label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input type="password" v-model="updateForm.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="updateForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="updateForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('updateForm')">提交</el-button>
          <el-button @click="resetForm('updateForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import router from '../router';
import { updatePassword } from '@/api/user'

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.updateForm.checkPass !== '') {
          this.$refs.updateForm.validateField('checkPass');
        }
        if (value.length < 6) {
          callback(new Error('请输入长度大于6的密码'));
        }
        callback();
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.updateForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }
    return {
      updateDialogVisible: false,
      updateForm: {
        password: '',
        checkPass: '',
        oldPassword: '',
        id: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: "请输入旧密码", trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
      }
    }
  },
  name: "home",
  methods: {
    submitForm(item) {
      this.$refs[item].validate((valid) => {

        if (valid) {
          let id = sessionStorage.getItem("id")
          this.updateForm.id = id

          updatePassword(this.updateForm).then(res => {
            if (res.code == 200) {
              sessionStorage.removeItem("jwt")
              router.push({
                path: "/"
              })
              this.$message.success("修改密码成功！请重新登录")
            } else {
              this.$message.error(res.msg)
            }
          })
        }


      })

    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleExit() {
      sessionStorage.removeItem("jwt")
      router.push({
        path: "/"
      })
      this.$message.success("退出成功，欢迎下次使用");
    },
    handLeClose(){
      this.updateForm.password='',
      this.updateForm.checkPass='',
      this.updateForm.oldPassword=''
      this.updateDialogVisible = false;
      },
    
    toDepartmentManagement() {
      router.push({
        path: "/departmentManagement/getList"
      })
    },
    toEmployeeManagement() {
      router.push({
        path: "/employeeManagement/getList"
      })
    },
    toHolidayManagement() {
      router.push({
        path: "/holidayManagement"
      })
    },
    toOvertimeManagement() {
      router.push({
        path: "/overtimeManagement"
      })
    },
    toSalaryManagement() {
      router.push({
        path: "/salaryManagement"
      })
    },
    tohome() {
      router.push({
        path: "/managementhome/home"
      })
    },

  }
}
</script>
<style scoped lang="scss">
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;


}

.el-aside {
  color: #333;
  overflow: unset;
  // width:"2000px";
}

#drop {
  // margin-left: 90%;
  left: 85%;
  // margin-top:0px;
  // margin-bottom: 10000px;
  // margin-right: 10px;
  // float:"right";
}
</style>
