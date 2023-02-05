<template>
  <div class="add-goods">
    <!-- 面包屑 -->
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/person' }"
          >用户管理</el-breadcrumb-item
        >
        <el-breadcrumb-item>添加用户</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 表单数据 -->
    <div class="myform">
       <el-form :model="personForm"
            :rules="rules"
             ref="personForm" 
             label-width="100px"
              class="demo-ruleForm">
                  <el-form-item label="姓名" class="username" prop="username">
                    <el-input v-model="personForm.username" label-width="200px"></el-input>
                </el-form-item>
                 <!-- <el-form-item label="ID" class="Username" prop="Username">
                    <el-input v-model="personForm.username"></el-input>
                </el-form-item> -->
                
                  <el-form-item class="Usex" label="性别" prop="Usex">
                    <el-radio-group v-model="personForm.Usex">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
                 <el-form-item label="部门" class="Did" prop="Did">
                    <el-input v-model="personForm.Did"></el-input>
                </el-form-item>
                 <el-form-item label="民族" class="Unation" prop="Unation">
                    <el-input v-model="personForm.Unation"></el-input>
                </el-form-item>
                 <el-form-item label="学历" class="Uvocation" prop="Uvocation">
                    <el-input v-model="personForm.Uvocation"></el-input>
                </el-form-item>
              

                <el-form-item label="生日" class="Uyear" required>
                    <el-col :span="11">
                    <el-form-item  prop="Uyear">
                        <el-date-picker type="date" placeholder="选择日期" v-model="personForm.Uyear" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    </el-col>      
                </el-form-item>
               
                 <el-form-item label="头像" class="Uimg" prop="Uimg">
                     <el-button  type="primary" >上传图片</el-button>
                     
                </el-form-item>
                <el-form-item label="手机" class="Uphone" prop="Uphone">
                    <el-input v-model="personForm.Uphone"></el-input>
                </el-form-item>
                 <el-form-item label="地址" class="Uhhome" prop="Uhome">
                    <el-input v-model="personForm.Uhome"></el-input>
                </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >确定</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        personForm: {
          username:" ",
          Did: '',
          Username:'',
          Usex: '',
          Unation: '',
          Uvocation: '',
          Uimg:'',
          Uyear:'',
          Uhome: '',
          Uphone: '',   
        },
          imgUrl:'',
         dialogVisible:false,
         rules: {
             //校验规则
          username: [
            { required: true, message: '请输入名字', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          Did: [{ required: true, message: '请输入Did', trigger: 'blur' }],
          Usex: [{required: true,trigger: 'blur'}],
          Unation: [ {  required: true, message: '请输入民族', trigger: 'blur' }],
          Uvocation: [{  required: true, message: '请输入学历', trigger: 'blur' } ],
          Uimg: [{  required: true, message: '请上传头像', trigger: 'blur'  }],
          Uyear: [ {  required: true, message: '请输入生日', trigger: 'blur' }],
          Uhome: [{  required: true, message: '请输入家庭地址', trigger: 'blur'  }],
          Uphone: [  {  required: true, message: '请输入手机号', trigger: 'blur'  }]
        
        }
      };
    }, 
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang='less' scoped>
.add-goods {
  margin: 20px;
}
.title {
  padding: 10px;
  background: #fff;
  border: 1px solid #eee;
  margin-bottom: 20px;
}
.myform {
  background: #fff;
  padding: 10px;
  padding-right: 30px;
}
.line{
    text-align: center;
}
</style>