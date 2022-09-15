<template>
  <section>
    <div>

      <el-container>
        <el-aside width="200px" class="el-aside">

          <el-menu :default-openeds="['1']" default-active="2">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-user-solid"></i>功能列表</template>
              <el-menu-item-group>
                <el-menu-item index="1-1">

                  <el-link type="primary" @click="toHoliday()">请假系统</el-link>

                </el-menu-item>
                <el-menu-item index="1-2">

                  <el-link type="success" @click="toOvertime()">加班系统</el-link>

                </el-menu-item>
                <el-menu-item index="1-3">

                  <el-link type="info" @click="toSalary()">工资表单</el-link>

                </el-menu-item>

              </el-menu-item-group>
            </el-submenu>

          </el-menu>


        </el-aside>

        <el-container>



          <el-header style=" font-size: 12px" class="el-header">
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
                  <el-button class="el-icon-thumb" @click="dialogVisible = true">实名认证</el-button>
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
      <el-dialog title="实名认证" :visible.sync="dialogVisible" width="25%">

        <el-form :model="userInfo" ref="formName" label-position="top">
          <el-form-item label="工号" prop="uuid">
            <el-input v-model="userInfo.uuid" type="number" placeholder="请输入你的工号"> </el-input>
          </el-form-item>


        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleBind(userInfo)">确 定</el-button>
        </span>
      </el-dialog>

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

  </section>
</template>
<script>
import router from '../router';
import { getOneById, userBind, updatePassword } from '@/api/user'
import { getUuid } from '@/api/employeeManagement'
import { getOneSalary } from '@/api/salaryManagement'
export default {
  name: "home",
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
      dialogVisible: false,
      updateDialogVisible: false,
      employeeId: "",
      userInfo: {
        uuid: "",
        id: "",
        password: "",
        username: "",

      },
      salaryInfo: {
        basePay: "",
        holiday: "",
        netSalary: ""
      },
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
  mounted() {
    this.getData()

  },
  methods: {
    getData() {
      let id = sessionStorage.getItem("id")
      getOneById(id).then(res => {
        if (res.code == 200) {
          this.userInfo = res.data
          this.employeeId = res.data.employeeId

          if (!this.userInfo.employeeId) {
            this.$message.success("请实名！")
          } else {
            getUuid(this.userInfo.employeeId).then(res => {
              this.userInfo.uuid = res.data
            })
          }
        } else {
          this.$message.error(res.msg)
        }
        getOneSalary(this.employeeId).then(res => {
          this.salaryInfo = res.data
        })
      })
    },
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


    handleBind(item) {

      userBind(item.id, item.uuid).then(res => {
        if (res.code == 200) {
          this.$message.success("实名成功")
        } else {
          this.$message.success(res.msg)
        }
      })
      this.dialogVisible = false


    },
    handLeClose(){
      this.updateForm.password='',
      this.updateForm.checkPass='',
      this.updateForm.oldPassword=''
      this.updateDialogVisible = false;
      },
    },
    handleExit() {
      sessionStorage.removeItem("jwt")
      router.push({
        path: "/"
      })
      this.$message.success("退出成功，欢迎下次使用");
    },
    toHoliday() {
      router.push({
        path: "/holidayEmpolyee"
      })
    },
    toSalary() {
      router.push({
        path: "/salaryEmployee"
      })
    },
    tohome() {
      router.push({
        path: "/employeehome/home"
      })
    },
    toOvertime() {
      router.push({
        path: "/overtimeEmployee"
      })
    },

  }

</script>
<style scoped lang="scss">
.el-header {
  background-color: #B3C0D1;
  // #B3C0D1
  color: #333;
  line-height: 60px;
}


.el-aside {
  color: #333;
  overflow: unset;
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
  