<template>
    <section>
      <div>
        <h1>部门列表</h1>
        <el-button icon="el-icon-plus" type="success" plain @click="handleAdd()">添加</el-button>
        <template>
          <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
            <el-table-column prop="departmentName" label="部门名" align="center">
              <template slot-scope="scope">{{ scope.row.departmentName }}</template>
            </el-table-column>
  
            <el-table-column prop="departmentInfo" label="部门信息" align="center">
              <template slot-scope="scope">{{ scope.row.departmentInfo }}</template>
            </el-table-column>
            <el-table-column prop="principal" label="负责人" align="center">
              <template slot-scope="scope">{{ scope.row.principal }}</template>
            </el-table-column>
            <el-table-column prop="date" label="创建日期" align="center">
              <template slot-scope="scope">{{ scope.row.createTime }}</template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="90">
              <template slot-scope="scope">
                <el-link type="primary" :underline="false" @click="handleEdit(scope.row)">编辑</el-link>
                <el-link type="danger" :underline="false" @click="handleDelete(scope.row)">删除</el-link>
              </template>
            </el-table-column>
  
  
          </el-table>
        </template>
      </div>
      <el-dialog :visible.sync="dialogVisible" width="25%" :show-close="false" :close-on-click-modal="false"
        :close-on-press-escape="false">
        <el-form :model="formInfo" :rules="rules" ref="formName" label-position="top">
          <el-form-item label="部门名" prop="departmentName">
            <el-input v-model="formInfo.departmentName" placeholder="请输入部门名"></el-input>
          </el-form-item>
          <el-form-item label="部门信息" prop="departmentInfo">
            <el-input v-model="formInfo.departmentInfo" placeholder="请输入部门信息"></el-input>
          </el-form-item>
          <el-form-item label="负责人" prop="principal">
            <el-input v-model="formInfo.principal" placeholder="请输入负责人"></el-input>
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
  import { getdepartmenList, deleteOne, updateOne, addOne } from '@/api/departmentManagement'
  export default
    {
      data() {
        return {
          tableData: [],
          check: false,
          dialogVisible: false,
          isEdit: false,
          formInfo: {
            departmentName:"",
            departmentInfo:"",
            principal:""
          },
          rules: {
            employeeName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
            employeeSex: [{ required: true, message: '请选择性别', trigger: 'change' }],
          },
          
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
          getdepartmenList().then(res => {
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
            departmentName: "",
            departmentInfo: "",
            principal: "",
          }
          this.dialogVisible = true;
        },
        //编辑
        handleEdit(item) {
          this.isEdit = true;
          this.formInfo = {
            id: item.id,
            departmentName: item.departmentName,
            departmentInfo: item.departmentInfo,
            principal: item.principal,
          }
          
          this.dialogVisible = true;
  
        },
        handleDelete(item){
            deleteOne(item.id).then(res=>{
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
                updateOne(this.formInfo).then(res => {
                  if (res.code == 200) {
                    this.upImageUrl='';
                    this.getData();
                    this.$message.success("编辑成功");
                  } else {
                    this.$message.error(res.msg);
                  }
  
                })
              } else {
                addOne(this.formInfo).then(res => {
                  if (res.code == 200) {
                    this.upImageUrl='';
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
