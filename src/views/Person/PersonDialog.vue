<template>
  <div>
    <!-- 
            title="添加员工" 弹框的标题
            :visible.sync="dialogVisible" 控制弹框显示隐藏 boolean 
       -->
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="clearForm"
    > 
      <!-- 内容区域 -->
      <span>
         <el-form :model="personForm"
            :rules="rules"
             ref="ruleForm" 
             label-width="100px"
              class="demo-ruleForm">
                  <el-form-item label="姓名" class="name" prop="name">
                    <el-input v-model="personForm.name" label-width="200px"></el-input>
                </el-form-item>
                 
              
                  <el-form-item class="Usex" label="性别" prop="Usex">
                    <el-radio-group v-model="personForm.Usex">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
                 <el-form-item label="部门" class="dup" prop="dup">
                    <el-input v-model="personForm.dup"></el-input>
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
                     <el-button  type="primary" @click="innerVisibleImg = true" >上传图片</el-button>
                      <img :src="personForm.Uimg" height="100px" alt="">
                </el-form-item>
                <el-form-item label="手机" class="Uphone" prop="Uphone">
                    <el-input v-model="personForm.Uphone"></el-input>
                </el-form-item>
                 <el-form-item label="地址" class="Uhhome" prop="Uhome">
                    <el-input v-model="personForm.Uhome"></el-input>
                </el-form-item>
                
              </el-form>
      </span>
        <!-- 弹框底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="clearForm">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>

 
     

      <!-- 1. 内弹框 --- 上传图片 -->
      <el-dialog
        width="40%"
        title="上传图片"
        :visible.sync="innerVisibleImg"
        append-to-body
      >
        <PersonUpdate @sendImg="sendImg" ref="upload" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisibleImg = false">取 消</el-button>
          <el-button type="primary" @click="showImg">确 定</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>

import PersonUpdate from './PersonUpdate.vue';

export default {
  props: {
    title:{
      type: String,
      default: "添加员工信息",
    },
    rowData:{
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  components: {
	   //注册组件
	  PersonUpdate
  },
  //不可以
  // motued(){
  //   console.log('生命周期----')
  // },
  data() {
    return {
      dialogVisible: false, //外弹框
      innerVisible: false, //内弹框
      innerVisibleImg: false, //图片弹框
      imgUrl:'',
          personForm: {

            username: "",
            dup: "",
            Usex: "",
            Unation: "",
            Uvocation:"",
            Uimg:"",
            name:"",
            Uyear:"",
            Uhome: "",
            Uphone: "",   
        },
         rules: {
             //校验规则
          name: [
            { required: true, message: '请输入名字', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2到 5 个字符', trigger: 'blur' }
          ],
          dup: [{ required: true, message: '请输入部门', trigger: 'blur' }],
          Usex: [{required: true, message: '请输入性别',trigger: 'blur'}],
          Unation: [ {  required: true, message: '请输入民族', trigger: 'blur' }],
          Uvocation: [{  required: true, message: '请输入学历', trigger: 'blur' } ],
          // Uimg: [{  required: true, message: '请上传头像', trigger: 'blur'  }],
          Uyear: [ {  required: true, message: '请输入生日', trigger: 'blur' }],
          Uhome: [{  required: true, message: '请输入家庭地址', trigger: 'blur'  }],
          Uphone: [  {  required: true, message: '请输入手机号', trigger: 'blur'  }]
        
        }
     
     
    };
  },
 methods:{
	

    /**
     * 显示图片的地址
     */
    sendImg(val) {
      console.log("显示图片的地址", val);
      this.imgUrl = val;
    },
    /**
     * 显示图片--确定按钮
     */
    showImg() {
      this.innerVisibleImg = false;
      this.personForm.img = this.imgUrl;
      //清空图片上传的列表
      this.$refs.upload.fileList = [];
    },
    //自定义事件--通知父亲--修改dialogVisible
    close() {
      this.$emit("changeDialog");
    },
      //修改员工数据
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log("获取输入的信息", this.personForm);
          //dup,username,Usex,Uphone,Uyear,Uhome,Unation,Uvocation
          let {
         
              dup,
              username,
              Usex,
              Uphone,
               name,
               Uimg,
              Uyear,
              Uhome,
              Unation,
              Uvocation
          } = this.personForm;
          //判断当前的确定按钮类型：
          if (this.title === "添加员工信息") {
            console.log("添加员工信息");
            this.$api
            .addPerson({

              dup,
              Usex,
              Uphone,
              name,
              Uyear,
              Uhome,
              Unation,
              Uvocation
              })
              .then((res) => {
                console.log("添加---实现---", res.data);
                if (res.data.status === 200) {
                  //成功
                  this.$parent.http(1); //更新父组件列表数据
                  this.$message({
                    message: "添加员工信息成功",
                    type: "success",
                  });
                  //清空表单
                  this.clearForm();
                } else {
                  this.$message.error("错了哦，这是一条错误消息");
                }
              });
          } else {
            console.log("编辑员工信息");
            this.$api
              .updatePerson({
              
              dup,
              username,
              Usex,
              Uphone,
              Uimg,
               name,
              Uyear,
              Uhome,
              Unation,
              Uvocation
              })
              .then((res) => {
                console.log(res.data);
                if (res.data.status === 200) {
                  this.$parent.http(1); //更新父组件列表数据
                  this.$message({
                    message: "修改员工成功",
                    type: "success",
                  });
                  //清空表单
                  this.clearForm();
                } else {
                  //修改失败了--
                }
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /**
     * 清空表单数据列表
     */
    clearForm() {
      this.dialogVisible = false; //1.关闭弹框
      // 清空表单  1 使用element里面的重置表单  2 自己手动初始化goodsForm
      // this.$refs.ruleForm.resetFields();
       this.personForm={
          username: "",
          dup: "",
          Usex: "",
          Unation: "",
          Uvocation:"",
          Uimg:"",
           name:"",
          Uyear:"",
          Uhome: "",
          Uphone: "",   
      };
    },   
  },
 };
</script>

<style lang='less' scoped>
</style>