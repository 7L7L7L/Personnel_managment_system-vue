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
                <el-link type="warning" @click="toHolidayManagement()">请假列表</el-link>
              </el-menu-item>
              <el-menu-item index="2-2">
                <el-link type="danger" @click="toDolidayManagement()">工资列表</el-link>
              </el-menu-item>
              
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button class="el-icon-thumb" @click="handleExit()">退出登录</el-button>
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
  </div>
</template>
<script>
import router from '../router';

export default {
  name: "home",
  methods:{
    handleExit(){
      sessionStorage.removeItem("jwt")
      router.push({
            path:"/"
        })
        this.$message.success("退出成功，欢迎下次使用");
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
}
</style>
