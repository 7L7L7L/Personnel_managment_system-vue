<template>
  <section>
    <div>
      <h1>请假列表</h1>
      <template>
        <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
          <el-table-column prop="employeeName" label="请假人" align="center">
            <template slot-scope="scope">{{ scope.row.employeeName }}</template>
          </el-table-column>
          <el-table-column prop="leaveReason" label="请假原因" align="center">
            <template slot-scope="scope">{{ scope.row.leaveReason }}</template>
          </el-table-column>

          <el-table-column prop="fromTime" label="起始时间" align="center">
            <template slot-scope="scope">{{ scope.row.fromTime }}</template>
          </el-table-column>
          <el-table-column prop="toTime" label="结束时间" align="center">
            <template slot-scope="scope">{{ scope.row.toTime }}</template>
          </el-table-column>
          <el-table-column prop="isAllow" label="是否被批准" align="center">
            <template slot-scope="scope">{{isAllow[scope.row.isAllow ] }}</template>
          </el-table-column>
          <el-table-column prop="state" label="状态" align="center">
            <template slot-scope="scope">{{ state[scope.row.state] }}</template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="90">
            <template slot-scope="scope">
              <el-link type="primary" :underline="false"  :disabled="scope.row.state===2||scope.row.isAllow!=2?true:false" @click="handleEdit(scope.row)">审批</el-link>
              <el-link type="danger" :underline="false" @click="handleDelete(scope.row)">删除</el-link>
            </template>
          </el-table-column>

        </el-table>
      </template>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="25%" :show-close="false" :close-on-click-modal="false"
      :close-on-press-escape="false" title="审批：">

    
      <el-form :model="formInfo"  ref="formName">
        <el-col class="allow" >
        <el-col id="agree" >同意:
          <el-col  >
            <el-button type="success" icon="el-icon-check" circle @click="handleAllow(formInfo)" ></el-button></el-col></el-col>   
      <el-col id="unagree" >不同意:
        <el-col >
          <el-button type="danger" icon="el-icon-close" circle @click="handleUnAllow(formInfo)"></el-button></el-col></el-col>
    </el-col>
      </el-form>
       
      
    
      

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <!-- <el-button type="primary" @click="submitForm('formName')">确定</el-button> -->
      </div>
    </el-dialog>
  </section>
</template>
  <script>
import { getHolidayList,deleteHoliday,allowHoliday} from '@/api/holidayManagement'
export default
  {
    data() {
      return {
        state:{
          0:"未开始",
          1:"假期期间",
          2:"已过期",
          3:"审核期间"
        },
        isAllow:{
          0:"不批准",
          1:"批准",
          2:"未审核"
        },
        
        defaultTime:[],
        tableData: [],
        dialogVisible: false,
        isEdit: false,
        allow:2,
        formInfo: {
          leaveReason:"",
          fromTime:"",
          toTime:"",
          isAllow:2,
          state:1,
          employeeId:0
        },
        pickerOptions: {
      disabledDate(time) {
        //Date.now()是javascript中的内置函数，它返回自1970年1月1日00:00:00 UTC以来经过的毫秒数。
        return time.getTime() < Date.now() - 8.64e7;
      },
    }
        
        
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
       
        getHolidayList().then(res => {
          if (res.code == 200) {
            this.tableData = res.data;
          } else {
            console.log(res.msg)
          }

        })
      },
      
  
      //编辑
      handleEdit(item) {
        
        this.formInfo = {
            id: item.id,
            leaveReason: item.leaveReason,
            fromTime: item.fromTime,
            toTime: item.toTime,

          }
        
        this.dialogVisible = true;

      },
      handleAllow(data){
        
        this.allow=1
        allowHoliday(data.id,this.allow).then(res=>{
          if (res.code == 200) {
          this.getData();
          this.$message.success("审批成功");
        } else {
          this.$message.error(res.msg);
        }
        })
        this.dialogVisible = false;
      },
      handleUnAllow(data){
        this.allow=0
        allowHoliday(data.id,this.allow).then(res=>{
          if (res.code == 200) {
          this.getData();
          this.$message.success(res.msg);
        } else {
          this.$message.error(res.msg);
        }
        })
        this.dialogVisible = false;
      },
      handleDelete(item){
        deleteHoliday(item.id).then(res=>{
              if (res.code == 200) {
          this.getData();
          this.$message.success("删除成功");
        } else {
          this.$message.error(res.msg);
        }

          })
      },
      
    },

  }

</script>
  
  <style >
  .el-table .warning-row {
    background: oldlace;
  }
  
  .el-table .success-row {
    background: #f0f9eb;
  }


  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .allow{
    text-align: center;
    
  }
  #agree{
      width: 50%;
    }
  #unagree{
    width: 50%;
  }
  </style>
