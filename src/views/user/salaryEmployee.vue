<template>
  <section>
    <div>
      <h1>个人工资表单</h1>
      <template>

        <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
          <el-table-column prop="uuid" label="工号" align="center"  >
            <template slot-scope="scope"  >{{ scope.row.uuid }}</template>
          </el-table-column>
          <el-table-column prop="employeeName" label="员工姓名" align="center"  >
            <template slot-scope="scope"  >{{ scope.row.employeeName }}</template>
          </el-table-column>
          <el-table-column prop="basePay" label="基本工资" align="center">
            <template slot-scope="scope">{{ scope.row.basePay }}</template>
          </el-table-column>

          <el-table-column prop="holiday" label="事病假" align="center">
            <template slot-scope="scope">{{ scope.row.holiday }}</template>
          </el-table-column>
          <el-table-column prop="overtime" label="加班工资" align="center">
            <template slot-scope="scope">{{  scope.row.overtime }}</template>
          </el-table-column>
          <el-table-column prop="netSalary" label="实际工资" align="center">
            <template slot-scope="scope">{{ scope.row.netSalary }}</template>
          </el-table-column>

        </el-table>
      </template>
    </div>
  </section>
</template>
  <script>
import {  getOneSalary} from '@/api/salaryManagement'
import { getOneById,} from '@/api/user'
import scope from 'css-tree/lib/syntax/scope'
export default
  {
    data() {
      return {      
        salaryInfo:{
          employeeName:"",
          basePay:"",
          holiday:"",
          overtime:"",
          netSalary:""
        },
        tableData:[],
        employeeId:""
      }
    },

    mounted() {
      this.getData()
    },

    methods: {
      tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'warning-row';
      } else if (rowIndex % 2 === 1) {
        return 'success-row';
      }
      return '';
    },
    getData() {
      let id = sessionStorage.getItem("id")
      getOneById(id).then(res => {
        
        if (res.code == 200) {
          this.employeeId=res.data.employeeId
        } else {
          this.$message.error(res.msg)
        }
        getOneSalary(this.employeeId).then(res=>{
        this.tableData=[res.data]
      })
      })
      
    },
    
      
  
     }

  }

</script>
  
  <style >
  .el-table .warning-row {
    background: oldlace;
  }
  
  .el-table .success-row {
    background: #f0f9eb;
  }


  </style>
