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
         <el-form :model="wagesForm"
            :rules="rules"
             ref="ruleForm" 
             label-width="100px"
              class="demo-ruleForm">
                  <el-form-item label="姓名" class="Uame" prop="name">
                    <el-input v-model="wagesForm.name" label-width="200px"></el-input>
                </el-form-item>
                
                 <el-form-item label="部门" class="udp" prop="udp">
                    <el-input v-model="wagesForm.udp"></el-input>
                </el-form-item>
                 <el-form-item label="基本工资" class="Wbasic" prop="Wbasic">
                    <el-input v-model="wagesForm.Wbasic"></el-input>
                </el-form-item>
                <el-form-item label="奖金" class="Wbonus" prop="Wbonus">
                    <el-input v-model="wagesForm.Wbonus"></el-input>
                </el-form-item>
                 <el-form-item label="罚款" class="Wfine" prop="Wfine">
                    <el-input v-model="wagesForm.Wfine"></el-input>
                </el-form-item>
              

              <el-form-item label="开始时间" class="Wup" required>
                    <el-col :span="11">
                    <el-form-item  prop="Wup">
                        <el-date-picker type="date" placeholder="选择日期" v-model="wagesForm.Wup" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    </el-col>      
                </el-form-item>
                 <el-form-item label="结束时间" class="Wdown" required>
                    <el-col :span="11">
                    <el-form-item  prop="Wdown">
                        <el-date-picker type="date" placeholder="选择日期" v-model="wagesForm.Wdown" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    </el-col>      
                </el-form-item> 
                
                <el-form-item label="审批日期" class="Wdate" required>
                    <el-col :span="11">
                    <el-form-item  prop="Wdate">
                        <el-date-picker type="date" placeholder="选择日期" v-model="wagesForm.Wdate" style="width: 100%;"></el-date-picker>
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
      default: "添加薪资信息",
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
          wagesForm: {
            Wid:"",
            name: "",
            udp: "",
            Wbasic:"",
            Wbonus: "",
            Wfine: "",
            Wup:"",
            Wdown:"",
            Wdate: "",   
        },
         rules: {
             //校验规则
          name: [
            { required: true, message: '请输入名字', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2到 5 个字符', trigger: 'blur' }
          ],
          udp: [{ required: true, message: '请输入部门', trigger: 'blur' }],
          Wbasic: [{required: true,  message: '请输入基本工资',trigger: 'blur'}],
          Wbonus: [ {  required: true, message: '请输入奖金', trigger: 'blur' }],
          Wfine: [{  required: true, message: '请输入罚款', trigger: 'blur' } ],   
          Wup: [ {  required: true, message: '请输入开始时间', trigger: 'blur' }],
          Wdown: [{  required: true, message: '请输入结束时间', trigger: 'blur'  }],
          Wdate: [  {  required: true, message: '请输入审批日期', trigger: 'blur'  }]
        
        }
     
     
    };
  },
 methods:{
  
    //自定义事件--通知父亲--修改dialogVisible
    close() {
      this.$emit("changeDialog");
    },
      //修改奖惩数据
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log("获取输入的信息", this.wagesForm);
          
          let {
           Wid,
            name,
            udp,
            Wbasic,
            Wbonus,
            Wfine,
            Wup,
            Wdown,
            Wdate,   
          } = this.wagesForm;
          //判断当前的确定按钮类型：
          if (this.title === "添加薪资信息") {
            console.log("添加薪资信息");
            this.$api
              .addWages({
               
                  
                
                    name,
                    udp,
                    Wbasic,
                    Wbonus,
                    Wfine,
                    Wup,
                    Wdown,
                    Wdate,   
              })
              .then((res) => {
                console.log("添加---实现---", res.data);
                if (res.data.status === 200) {
                  //成功
                  this.$parent.http(1); //更新父组件列表数据
                  this.$message({
                    message: "添加薪资信息成功",
                    type: "success",
                  });
                  //清空表单
                  this.clearForm();
                } else {
                  this.$message.error("错了哦，这是一条错误消息");
                }
              });
          } else {
            console.log("编辑薪资信息");
            this.$api
              .updateWages({
                Wid,
                name,
                udp,
                Wbasic,
                Wbonus,
                Wfine,
                Wup,
                Wdown,
                Wdate,   
              })
              .then((res) => {
                console.log(res.data);
                if (res.data.status === 200) {
                  this.$parent.http(1); //更新父组件列表数据
                  this.$message({
                    message: "修改薪资信息成功",
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
       this.wagesForm={
            Wid:"",
            name: "",
            udp: "",
            Wbasic:"",
            Wbonus: "",
            Wfine: "",
            Wup:"",
            Wdown:"",
            Wdate: "",   
      };
    },   
  },
 };
</script>

<style lang='less' scoped>
</style>