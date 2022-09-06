<template>
    <div>
      <el-container>
        <el-aside width="200px">
          <el-menu :default-openeds="['1']">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-user-solid"></i>功能列表</template>
              <el-menu-item-group>
                <el-menu-item index="1-1">
                  <!--插入的地方-->
                  <router-link to="/holidayManagement">请假系统</router-link>
                </el-menu-item>
                <el-menu-item index="1-2">
                  <!--插入的地方-->
                  <router-link to="/employeeManagement/getList">工资系统</router-link>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-s-management"></i>个人信息</template>
              <el-menu-item-group>
                <el-menu-item index="2-1">修改密码</el-menu-item>
                <el-menu-item index="2-2">内容列表</el-menu-item>
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
      }
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
  