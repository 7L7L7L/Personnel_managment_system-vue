<template>
  <section>
    <div>

      <el-container>
        <el-aside width="200px">
          <el-menu :default-openeds="['1']">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-user-solid"></i>功能列表</template>
              <el-menu-item-group>
                <el-menu-item index="1-1">
                  <!--插入的地方-->
                  <el-link type="primary" @click="toHoliday()">请假系统</el-link>
                  <!-- <router-link to="/holidayEmpolyee">请假系统</router-link> -->
                </el-menu-item>
                <el-menu-item index="1-2">
                  <!--插入的地方-->
                  <el-link type="success" @click="dialogVisible = true">工资系统</el-link>
                  <!-- <router-link to="/employeeManagement/getList">工资系统</router-link> -->
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-s-management"></i>个人信息</template>
              <el-menu-item-group>
                <el-menu-item index="2-1">
                  <el-link type="primary" @click="dialogVisible = true">查看个人信息</el-link>
                </el-menu-item>
                <el-menu-item index="2-2">内容列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>

        </el-aside>

        <el-container>
          <el-header style="text-align: right; font-size: 12px">
            <el-dropdown>
              <el-button type="primary" class="el-icon-setting">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <el-button class="el-icon-thumb" @click="handleExit()">退出登录</el-button>
                </el-dropdown-item>
                <el-dropdown-item>

                  <el-button class="el-icon-thumb" @click="dialogVisible = true">实名认证</el-button>
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

    </div>

  </section>
</template>
<script>
import router from '../router';
import { getOneById, userBind, updatePassword } from '@/api/user'
import { getUuid } from '@/api/employeeManagement'
export default {
  name: "home",
  data() {
    return {
      dialogVisible: false,
      userInfo: {
        uuid: "",
        id: "",
        password: "",
        username: ""
      },

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
      })
    },
    handleBind(item) {
      
      userBind(item.id, item.uuid).then(res => {
        if (res.code == 200) {
          this.$message.success("实名成功")
        } else {
          this.$message.success(res.msg)
        }
      })
      this.dialogVisible =false


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
}
</style>
  