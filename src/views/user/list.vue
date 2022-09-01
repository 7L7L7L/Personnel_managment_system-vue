<template>
  <div>
    <h1>用户列表</h1>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别"
      width="180">
    </el-table-column>
    <el-table-column
      prop="telephone"
      label="电话"
      width="180">
      
    </el-table-column>
    <el-table-column
      prop="date"
      label="入职日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
    <el-table-column>
      <el-button type="danger" v-on:click="deleteEmployee">删除</el-button>
    </el-table-column>
    
    <el-table-column>
      <img src="src\static\background.jpg">
    </el-table-column>
    
  </el-table>
</div>
</template>
  <script>
    import {getList} from '@/api/employeeManagement'
    import{deleteEmployee}from '@/api/employeeManagement'
    export default 
    {
      
      name: "UserList",
      mounted(){
        this.getData()
      },
      methods:{
        getData:function(){
           getList().then(res=>{
            this.tableData = res.data;
            console.log(res)
           })
        },
        deleteEmployee:function(){
          deleteEmployee().then(res=>{
            console.log(res)
        })
      },
    },
      data() {
      return {
        tableData: []
      }
    },
  }
     
  
</script>
  

<!-- <script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    }
  }
</script> -->
  <style scoped>
  </style>