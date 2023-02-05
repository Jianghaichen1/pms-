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
         <el-form :model="randpForm"
            :rules="rules"
             ref="ruleForm" 
             label-width="100px"
              class="demo-ruleForm">
              
                  <el-form-item label="部门" class="dup" prop="dup">
                    <el-input v-model="randpForm.dup" label-width="200px"></el-input>
                </el-form-item>
                  <el-form-item label="姓名" class="uname" prop="uname">
                    <el-input v-model="randpForm.uname" label-width="200px"></el-input>
                </el-form-item>
               
                  <el-form-item  class="Rtype" label="奖惩类型" prop="Rtype">
                    <el-input v-model="randpForm.Rtype"></el-input>
                </el-form-item>
               
            
                 <el-form-item label="奖惩金额" class="Rsum" prop="Rsum">
                    <el-input v-model="randpForm.Rsum"></el-input>
                </el-form-item>
                 
                 <el-form-item label="审批原因" class="Reason" prop="Reason">
                    <el-input v-model="randpForm.Reason"></el-input>
                </el-form-item>

                <el-form-item label="奖惩日期" class="Rdate1" required>
                    <el-col :span="11">
                    <el-form-item  prop="Rdate1">
                        <el-date-picker type="date" placeholder="选择日期" v-model="randpForm.Rdate1" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    </el-col>      
                </el-form-item>    
                <el-form-item label="审批日期" class="Rdate2" required>
                    <el-col :span="11">
                    <el-form-item  prop="Rdate2">
                        <el-date-picker type="date" placeholder="选择日期" v-model="randpForm.Rdate2" style="width: 100%;"></el-date-picker>
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
      default: "添加奖惩信息",
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
        randpForm:{
                Rid:'',
                uname:'',
                dup:'',
                Rsum:'',
                Rdate1:'',
                Rdate2:'',
                Rtype:'',
                Reason:''
        },
         rules: {
             //校验规则
          uname: [
            {   required: true, message: '请输入名字', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2到 5 个字符', trigger: 'blur' }
          ],
          dup: [{ required: true, message: '请输入部门', trigger: 'blur' }],
          Rtype: [{required: true,trigger: 'blur'}],
          Rdate1: [ {  required: true, message: '请输入奖惩日期', trigger: 'blur' }],
          Rdate2: [{  required: true, message: '请输入审批日期', trigger: 'blur' } ],
          Reason: [ {  required: true, message: '请输入审批原因', trigger: 'blur' }],
          Rsum: [  {  required: true, message: '请输入奖惩金额', trigger: 'blur'  }]
        
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
          console.log("获取输入的信息", this.randpForm);
          
          let {
            Rid,
           uname,
           dup,
          Rsum,
          Rdate1,
          Rtype,
          Reason, 
          Rdate2
          } = this.randpForm;
          //判断当前的确定按钮类型：
          if (this.title === "添加奖惩信息") {
            console.log("添加奖惩信息");
            this.$api
              .addRandp({
               
                  
                  uname,
                  dup,
                  Rsum,
                  Rdate1,
                  Rtype,
                  Reason, 
                  Rdate2
              })
              .then((res) => {
                console.log("添加---实现---", res.data);
                if (res.data.status === 200) {
                  //成功
                  this.$parent.http(1); //更新父组件列表数据
                  this.$message({
                    message: "添加奖惩信息成功",
                    type: "success",
                  });
                  //清空表单
                  this.clearForm();
                } else {
                  this.$message.error("错了哦，这是一条错误消息");
                }
              });
          } else {
            console.log("编辑奖惩信息");
            this.$api
              .updateRandp({
                 Rid,
                uname,
                dup,
                Rsum,
                Rdate1,
                Rtype,
                Reason, 
                Rdate2
              })
              .then((res) => {
                console.log(res.data);
                if (res.data.status === 200) {
                  this.$parent.http(1); //更新父组件列表数据
                  this.$message({
                    message: "修改奖惩信息成功",
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
       this.randpForm={
                 Rid:'',
                uname:'',
                dup:'',
                Rsum:'',
                Rdate1:'',
                Rdate2:'',
                Rtype:'',
                Reason:''
      };
    },   
  },
 };
</script>

<style lang='less' scoped>
</style>