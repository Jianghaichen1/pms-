<template>
  <div>
    <!-- 
            title="添加用户" 弹框的标题
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
         <el-form :model="attendForm"
            :rules="rules"
             ref="ruleForm" 
             label-width="100px"
              class="demo-ruleForm">
               <el-form-item label="部门" class="udp" prop="udp">
                    <el-input v-model="attendForm.udp" label-width="200px"></el-input>
                </el-form-item>
                 <el-form-item label="姓名" class="name" prop="name">
                    <el-input v-model="attendForm.name"></el-input>
                </el-form-item>
                  <el-form-item class="type" label="打卡" prop="type">
                    <el-radio-group v-model="attendForm.type">
                    <el-radio label="已打卡"></el-radio>
                    <el-radio label="未打卡"></el-radio>
                    </el-radio-group>
                </el-form-item>
                 <el-form-item label="位置" class="Alocation" prop="Alocation">
                    <el-input v-model="attendForm.Alocation"></el-input>
                </el-form-item>
                 <el-form-item label="开始时间" class="Aup" required>
                    <el-col :span="11">
                    <el-form-item  prop="Adown">
                        <el-date-picker type="date" placeholder="选择日期" v-model="attendForm.Aup" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    </el-col>      
                </el-form-item>        
                <el-form-item label="结束时间" class="Adown" required>
                    <el-col :span="11">
                    <el-form-item  prop="Adate">
                        <el-date-picker type="date" placeholder="选择日期" v-model="attendForm.Adown" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    </el-col>      
                </el-form-item>    
  

              </el-form>
      </span>
      <!-- 弹框底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="clearForm">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>

 
     

     
    </el-dialog>
  </div>
</template>

<script>



export default {
  props: {
    title: {
      type: String,
      default: "添加考勤信息",
    },
    rowData: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      dialogVisible: false, //外弹框
      innerVisible: false, //内弹框
    
          attendForm: {
            Aid:'',
          Aup:'',
          Adown:'',
          udp:'',
          name:'',
          type: '', 
          Alocation:'',
        },
         rules: {
             //校验规则
          name: [
            { required: true, message: '请输入名字', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          udp: [{ required: true, message: '请输入部门', trigger: 'blur' }],
          type: [{required: true,trigger: 'blur'}],
          Aup: [ {  required: true, message: '结束时间', trigger: 'blur' }],
          Adown: [{  required: true, message: '开始时间', trigger: 'blur' } ],
          Alocation: [{  required: true, message: '请输入位置', trigger: 'blur' } ],
         
        
        }
     
     
    };
  },
 methods:{
	

    //自定义事件--通知父亲--修改dialogVisible
    close() {
      this.$emit("changeDialog");
    },
      //修改考勤数据
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log("获取输入的信息", this.attendForm);
          //   Aup, Adown,udp,name, type, Alocation,
          let {
            Aid,
           Aup,
          Adown,
          udp,
          name,
          type, 
          Alocation,
          } = this.attendForm;
          //判断当前的确定按钮类型：
          if (this.title === "添加考勤信息") {
            console.log("添加考勤信息");
            this.$api
              .addAttend({
               
                  Aup,
                  Adown,
                  udp,
                  name,
                  type, 
                  Alocation,
              })
              .then((res) => {
                console.log("添加---实现---", res.data);
                if (res.data.status === 200) {
                  //成功
                  this.$parent.http(1); //更新父组件列表数据
                  this.$message({
                    message: "添加考勤信息成功",
                    type: "success",
                  });
                  //清空表单
                  this.clearForm();
                } else {
                  this.$message.error("错了哦，这是一条错误消息");
                }
              });
          } else {
            console.log("编辑考勤信息");
            this.$api
              .updateAttend({
                Aid,
                Aup,
                Adown,
                udp,
                name,
                type, 
                Alocation,
              })
              .then((res) => {
                console.log(res.data);
                if (res.data.status === 200) {
                  this.$parent.http(1); //更新父组件列表数据
                  this.$message({
                    message: "修改考勤信息成功",
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
       this.attendForm={
          Aup:"",
          Adown:"",
          udp:"",
          name:"",
          type:"",
          Alocation:"",
      };
    },   
  },
 };
</script>

<style lang='less' scoped>
</style>