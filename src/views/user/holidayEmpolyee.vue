<template>
    <section>
      <div>
        <h1>我的请假列表</h1>
        <el-button icon="el-icon-plus" type="success" plain @click="handleAdd()">添加</el-button>
        <template>
          <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
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
                <el-link type="primary" :underline="false" :disabled="scope.row.state===2||scope.row.isAllow!=2?true:false" @click="handleEdit(scope.row)">编辑</el-link>
                <el-link type="danger" :underline="false" @click="handleDelete(scope.row.id)">删除</el-link>
              </template>
            </el-table-column>
  
  
          </el-table>
        </template>
      </div>
      <el-dialog :visible.sync="dialogVisible" width="25%" :show-close="false" :close-on-click-modal="false"
        :close-on-press-escape="false">
        <el-form :model="formInfo"  ref="formName" label-position="top" :rules="rules">
          <el-form-item label="请假原因" prop="leaveReason">
            <el-input v-model="formInfo.leaveReason"  placeholder="请输入请假原因"></el-input>
          </el-form-item>
          <!-- <el-form-item label="起始时间" prop="fromTime">
            <el-input v-model="formInfo.fromTime" placeholder="请输入起始时间"></el-input>
          </el-form-item>
          <el-form-item label="结束时间" prop="toTime">
            <el-input v-model="formInfo.toTime" placeholder="请输入结束时间"></el-input>
          </el-form-item> -->
          <el-form-item label="起始时间" prop="fromTime" >
          <el-date-picker v-model="formInfo.fromTime" 
          type="datetime" 
          placeholder="选择日期"  
          value-format="yyyy-MM-dd HH:mm:ss"
          :picker-options="pickerOptionsFrom"
          
          >
          </el-date-picker>
          {{formInfo.fromTime}}
        </el-form-item>
        <el-form-item label="结束时间" prop="toTime">
          <el-date-picker v-model="formInfo.toTime" 
          type="datetime" 
          placeholder="选择日期" 
          value-format="yyyy-MM-dd HH:mm:ss"
          :picker-options="pickerOptionsTo">
          </el-date-picker>
          {{formInfo.toTime}}
        </el-form-item>
        </el-form>
        
  
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('formName')">确定</el-button>
        </div>
      </el-dialog>
    </section>
  </template>
    <script>
  import { getHolidayForOne,deleteHoliday,addHoliday,updateHoliday} from '@/api/holidayManagement'
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
          rules: {
            leaveReason: [
          { required: true, message: " 请假原因不可以为空", trigger: 'blur' }
        ],
        fromTime: [
          { required: true, message: " 开始时间不可为空 ", trigger: 'blur' }
        ],
        toTime: [
          { required: true, message: " 结束时间不可为空 ", trigger: 'blur' }
        ],
      },
          defaultTime:[],
          tableData: [],
          dialogVisible: false,
          isEdit: false,
          formInfo: {
            leaveReason:"",
            fromTime:"",
            toTime:"",
            isAllow:2,
            state:1,
            employeeId:0
          },    
            pickerOptionsTo: {
                //结束时间不能大于开始时间
                disabledDate: (time) => {
                    if (this.formInfo.fromTime) {
                        return time.getTime() < new Date(this.formInfo.fromTime).getTime();
                    }else{
                      //还没有选择结束时间的时候，让他只能选择今天之后的时间包括今天
                        return time.getTime() < Date.now() - 8.64e7
                    } 
 
                },
              },

            pickerOptionsFrom: {
                disabledDate: (time) => {
                    if(this.formInfo.toTime){
                      return time.getTime() > new Date(this.formInfo.toTime).getTime() - 1*24*60*60*1000;//可以选择同一天
                    }else{
                      //还没有选择结束时间的时候，让他只能选择今天之后的时间包括今天
                        return time.getTime() < Date.now() - 8.64e7
                    } 
                }

          
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
         
          getHolidayForOne().then(res => {
            if (res.code == 200) {
              this.tableData = res.data;
            } else {
              console.log(res.msg)
            }
  
          })
        },
        
        //添加
        handleAdd() {
          this.isEdit = false;
          this.formInfo = {
            leaveReason: "",
            fromTime: "",
            toTime: "",
            isAllow:2,
            state:3
          }
          this.dialogVisible = true;
        },
        //编辑
        handleEdit(item) {
          this.isEdit = true;
          this.formInfo = {
            id: item.id,
            leaveReason: item.leaveReason,
            fromTime: item.fromTime,
            toTime: item.toTime,
            isAllow:2,
            state:3
          }
          
          this.dialogVisible = true;
  
        },
        handleDelete(item){
          
          deleteHoliday(item).then(res=>{
                if (res.code == 200) {
            this.getData();
            this.$message.success("删除成功");
          } else {
            this.$message.error(res.msg);
          }

            })
        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              
              if (this.isEdit) {
                updateHoliday(this.formInfo).then(res => {
                  
                  if (res.code == 200) {
                    this.getData();
                    this.$message.success("编辑成功");
                  } else {
                    this.$message.error(res.msg);
                  }
  
                })
              } else {
                this.formInfo.employeeId=sessionStorage.getItem("id")
                addHoliday(this.formInfo).then(res => {
                  
                  if (res.code == 200) {
                    
                    this.getData();
                    this.$message.success("添加成功");
                  } else {
                    this.$message.error(res.msg);
                  }
  
                })
              }
              this.dialogVisible = false;
            } else {
              console.log('error submit!!');
              return false;
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
  
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    </style>
