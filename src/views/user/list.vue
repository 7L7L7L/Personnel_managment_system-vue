<template>
  <section>
    <div>
      <h1>用户列表</h1>
      <el-link :underline="false" icon="el-icon-plus" type="primary" @click="handleAdd()">添加</el-link>
      <template>
        <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
          <el-table-column prop="name" label="姓名" align="center">
            <template slot-scope="scope">{{ scope.row.employeeName }}</template>
          </el-table-column>

          <el-table-column prop="sex" label="性别" align="center">
            <template slot-scope="scope">{{ scope.row.employeeSex }}</template>
          </el-table-column>
          <el-table-column prop="telephone" label="电话" align="center">
            <template slot-scope="scope">{{ scope.row.employeeTelephone }}</template>
          </el-table-column>
          <el-table-column prop="date" label="入职日期" align="center">
            <template slot-scope="scope">{{ scope.row.createTime }}</template>
          </el-table-column>
          <el-table-column prop="address" label="地址" align="center">
            <template slot-scope="scope">{{ scope.row.employeeAddress }}</template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="90">
            <template slot-scope="scope">
              <el-link type="primary" :underline="false" @click="handleEdit(scope.row)">编辑</el-link>
              <el-link type="primary" :underline="false" @click="handleCheck(scope.row)">查看信息</el-link>
              <el-link type="danger" :underline="false" @click="handleDelete(scope.row)">删除</el-link>
            </template>
          </el-table-column>


        </el-table>
      </template>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="25%" :show-close="false" :close-on-click-modal="false"
      :close-on-press-escape="false">
      <el-form :model="formInfo" :rules="rules" ref="formName" label-position="top">
        <el-form-item label="姓名" prop="employeeName">
          <el-input v-model="formInfo.employeeName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="employeeSex">
          <el-select v-model="formInfo.employeeSex" placeholder="请选择性别" style="width: 100%">
            <el-option label="男" :value="1"> </el-option>
            <el-option label="女" :value="2"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话号" prop="employeeTelephone">
          <el-input v-model="formInfo.employeeTelephone" placeholder="请输入电话号"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="employeeAddress">
          <el-input v-model="formInfo.employeeAddress" placeholder="请输入地址"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="imagesUrl">
          <!-- <el-button type="primary" @click="getpicture">确定</el-button>-->
          <img  :src="formInfo.imagesUrl" class="avatar"> 
        </el-form-item>
        <el-form-item label="文件图片" prop="upImages">
          <el-upload class="avatar-uploader" action="/api/employeeManagement/upload"
            :show-file-list="false" 
            name="file"
            :on-success="handleAvatarSuccess" 
            :before-upload="beforeAvatarUpload"
            >
            <img v-if="upImageUrl" :src="upImageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

      </el-form>
      

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('formName')">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="check" width="25%" :show-close="false" :close-on-click-modal="false"
      :close-on-press-escape="false">
      <el-form :model="personInfo" ref="personInfo" label-position="top">
        <el-form-item label="姓名" prop="employeeName">
          {{ personInfo.employeeName }}
        </el-form-item>
        <el-form-item label="性别" prop="employeeSex">
          {{ personInfo.employeeSex }}
        </el-form-item>
        <el-form-item label="部门" prop="departmentName">
          {{ personInfo.departmentName }}
        </el-form-item>
        <el-form-item label="电话号" prop="employeeTelephone">
          {{ personInfo.employeeTelephone }}
        </el-form-item>
        <el-form-item label="地址" prop="employeeAddress">
          {{ personInfo.employeeAddress }}
        </el-form-item>
        <el-form-item label="图片" prop="pictureUrl">
          <!-- <el-button type="primary" @click="getpicture">确定</el-button>-->
          <img  :src="personInfo.pictureUrl" class="avatar"> 
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="check = false">取 消</el-button>
      </div>
    </el-dialog>

  </section>
</template>
  <script>
import { getList, deleteEmployee, updateEmployee, addOne } from '@/api/employeeManagement'
export default
  {
    data() {
      return {
        tableData: [],
        check: false,
        dialogVisible: false,
        isEdit: false,
        formInfo: {
          employeeName: "",
          employeeSex: "",
          employeeTelephone: "",
          employeeAddress: "",
          imagesUrl: "",
          employeeImageAddress:"",
          departmentName:""
        },
        personInfo: {
          employeeName: "",
          employeeSex: "",
          employeeTelephone: "",
          employeeAddress: "",
          pictureUrl:'',
          departmentName:""
        },
        rules: {
          employeeName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
          employeeSex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        },
        imagFileList: [],
        upImageUrl: ''
      }
    },

    mounted() {
      this.getData()
    //   if (location.href.indexOf("#reloaded")<=0) {
    //   location.href = location.href + "#reloaded"+"#reloaded";
    //   location.reload();
    // }

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
        getList().then(res => {
          if (res.code == 200) {
            this.tableData = res.data;
          } else {
            console.log(res.msg)
          }

        })
      },
      //图片
      handleDelete(data) {
        deleteEmployee(data).then(res => {
          if (res.code == 200) {
            this.getData();
            this.$message.success("删除成功");
          } else {
            this.$message.error(res.msg);
          }

        })
      },
      handleAvatarSuccess(res) {
        this.upImageUrl = http+'/image/'+res.data;
       this.formInfo.employeeImageAddress=res.data;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type == "image/png" ||file.type === 'image/jpeg';
        const isLt10M = file.size / 1024 / 1024 < 10;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG,PNG 格式!');
        }
        if (!isLt10M) {
          this.$message.error('上传头像图片大小不能超过 10MB!');
        }
        return isJPG && isLt10M;
      },
      //添加
      handleAdd() {
        this.isEdit = false;
        this.formInfo = {
          employeeName: "",
          employeeSex: "",
          employeeTelephone: "",
          employeeAddress: "",
          pictureUrl:"",
        }
        this.dialogVisible = true;
      },
      //编辑
      handleEdit(item) {
        this.isEdit = true;
        this.formInfo = {
          id: item.id,
          employeeTelephone: item.employeeTelephone,
          employeeName: item.employeeName,
          employeeSex: item.employeeSex,
          employeeAddress: item.employeeAddress,
          imagesUrl:http+'/image/'+item.employeeImageAddress,
        }
        
        this.dialogVisible = true;

      },
      handleCheck(item) {
        this.personInfo = {
          id: item.id,
          employeeTelephone: item.employeeTelephone,
          employeeName: item.employeeName,
          employeeSex: item.employeeSex,
          employeeAddress: item.employeeAddress,
          pictureUrl:http+'/image/'+item.employeeImageAddress,
        }
        console.log(this.personInfo)
        this.check = true;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.isEdit) {
              if (this.formInfo.employeeSex === 1) {
                this.formInfo.employeeSex = "男";
              }
              if (this.formInfo.employeeSex === 2) {
                this.formInfo.employeeSex = "女";
              }
              console.log("提交后:"+this.formInfo.employeeImageAddress)
              updateEmployee(this.formInfo).then(res => {
                if (res.code == 200) {
                  location.reload();
                  this.getData();
                  this.$message.success("编辑成功");
                } else {
                  this.$message.error(res.msg);
                }

              })
            } else {
              if (this.formInfo.employeeSex === 1) {
                this.formInfo.employeeSex = "男";
              }
              if (this.formInfo.employeeSex === 2) {
                this.formInfo.employeeSex = "女";
              }
              addOne(this.formInfo).then(res => {
                if (res.code == 200) {
                  location.reload();
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