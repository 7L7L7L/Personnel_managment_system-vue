<template>
    <section>
      <div>
        <h1>我的加班列表</h1>
        <el-button icon="el-icon-plus" type="success" plain @click="handleAdd()">添加</el-button>
        <template>
          <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
            <el-table-column prop="employeeName" label="姓名" align="center">
              <template slot-scope="scope">{{ scope.row.employeeName }}</template>
            </el-table-column>
  
            <el-table-column prop="overtimeFrom" label="起始时间" align="center">
              <template slot-scope="scope">{{ scope.row.overtimeFrom }}</template>
            </el-table-column>
            <el-table-column prop="overtimeTo" label="结束时间" align="center">
              <template slot-scope="scope">{{ scope.row.overtimeTo }}</template>
            </el-table-column>
            <el-table-column prop="isAllow" label="是否被批准" align="center">
              <template slot-scope="scope">{{isAllow[scope.row.isAllow ] }}</template>
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
        :close-on-press-escape="false" :title="formInfo.formName">
        <el-form :model="formInfo"  ref="formName" label-position="top" :rules="rules" >
         
          <el-form-item label="起始时间" prop="overtimeFrom" >
          <el-date-picker v-model="formInfo.overtimeFrom" 
          type="datetime" 
          placeholder="选择日期"  
          value-format="yyyy-MM-dd HH:mm:ss"
          :picker-options="pickerOptionsFrom"
          
          >
          </el-date-picker>
          {{formInfo.overtimeFrom}}
        </el-form-item>
        <el-form-item label="结束时间" prop="overtimeTo">
          <el-date-picker v-model="formInfo.overtimeTo" 
          type="datetime" 
          placeholder="选择日期" 
          value-format="yyyy-MM-dd HH:mm:ss"
          :picker-options="pickerOptionsTo">
          </el-date-picker>
          {{formInfo.overtimeTo}}
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
  import { getOvertimeForOne,deleteOvertime,addOvertime,updateOvertime} from '@/api/overtimeManagement'
  export default
    {
      data() {
        return {
         
          isAllow:{
            0:"不通过",
            1:"通过",
            2:"未审核"
          },
          rules: {
           
        overtimeFrom: [
          { required: true, message: " 开始时间不可为空 ", trigger: 'blur' }
        ],
        overtimeTo: [
          { required: true, message: " 结束时间不可为空 ", trigger: 'blur' }
        ],
      },
          defaultTime:[],
          tableData: [],
          dialogVisible: false,
          isEdit: false,
          formInfo: {
            formName:"",
            overtimeFrom:"",
            overtimeTo:"",
            isAllow:2,
            employeeId:0
          },    
            pickerOptionsTo: {
                //结束时间不能大于开始时间
                disabledDate: (time) => {
                    if (this.formInfo.overtimeFrom) {
                        return time.getTime() <= new Date( this.formInfo.overtimeFrom).getTime()- 8.64e7||time.getTime() > new Date( this.formInfo.overtimeFrom).getTime();
                    }else{
                      //还没有选择结束时间的时候，让他只能选择今天之后的时间包括今天
                        return time.getTime() < Date.now() - 8.64e7
                    } 
 
                },
              },

            pickerOptionsFrom: {
                disabledDate: (time) => {
                    // if(this.formInfo.overtimeTo){
                    //   return time.getTime() > new Date(this.formInfo.overtimeTo).getTime() - 1*24*60*60*1000;//可以选择同一天
                    // }else{
                      //还没有选择结束时间的时候，让他只能选择今天之后的时间包括今天
                        return time.getTime() < Date.now() - 8.64e7
                    // } 
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
         
          getOvertimeForOne().then(res => {
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
            formName:"添加加班情况",
            overtimeFrom: "",
            overtimeTo: "",
            isAllow:2,
          }
          this.dialogVisible = true;
        },
        //编辑
        handleEdit(item) {
          this.isEdit = true;
          this.formInfo = {
            formName:"更改加班情况",
            id: item.id,
            overtimeFrom: item.overtimeFrom,
            overtimeTo: item.overtimeTo,
            isAllow:2,
          }
          
          this.dialogVisible = true;
  
        },
        handleDelete(item){
          
          deleteOvertime(item).then(res=>{
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
                updateOvertime(this.formInfo).then(res => {
                  
                  if (res.code == 200) {
                    this.getData();
                    this.$message.success("编辑成功");
                  } else {
                    this.$message.error(res.msg);
                  }
  
                })
              } else {
                this.formInfo.employeeId=sessionStorage.getItem("id")
                addOvertime(this.formInfo).then(res => {
                  
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
  
  
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    </style>
