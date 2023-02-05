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
         <el-form :model="trainForm"
            :rules="rules"
             ref="ruleForm" 
             label-width="100px"
              class="demo-ruleForm">
                <el-form-item label="姓名" class="uname" prop="uname">
                    <el-input v-model="trainForm.uname" label-width="200px"></el-input>
                </el-form-item>   
                <el-form-item label="部门" class="dup" prop="dup">
                    <el-input v-model="trainForm.dup" label-width="200px"></el-input>
                </el-form-item>
                <el-form-item class="Tate" label="签到" prop="Tate">
                    <el-radio-group v-model="trainForm.Tate">
                    <el-radio label="已签到"></el-radio>
                    <el-radio label="未签到"></el-radio>
                    </el-radio-group>
                </el-form-item>
                 <el-form-item class="Type" label="培训类型" prop="Type">
                    <el-radio-group v-model="trainForm.Type">
                    <el-radio label="技能培训"></el-radio>
                    <el-radio label="学术培训"></el-radio>
                    <el-radio label="出境"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="开始时间" class="Tup" required>
                    <el-col :span="11">
                    <el-form-item  prop="Tup">
                        <el-date-picker type="date" placeholder="选择日期" v-model="trainForm.Tup" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    </el-col>      
                </el-form-item>    
                <el-form-item label="结束时间" class="Tdown" required>
                    <el-col :span="11">
                    <el-form-item  prop="Tdown">
                        <el-date-picker type="date" placeholder="选择日期" v-model="trainForm.Tdown" style="width: 100%;"></el-date-picker>
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
      default: "添加培训信息",
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
          trainForm: {
            uname: '',
            Tid: '',
            dup:'',
            Tate: '',
            Type: '',
            Tup: '',
            Tdown:'',
        },
         rules: {
             //校验规则
          uname: [
            { required: true, message: '请输入名字', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2到 5 个字符', trigger: 'blur' }
          ],
          dup: [{ required: true, message: '请输入部门', trigger: 'blur' }],
       
          Tup: [{  required: true, message: '请输入开始时间', trigger: 'blur'  }],
          Tdown: [  {  required: true, message: '请输入结束时间', trigger: 'blur'  }]
        
        }
     
     
    };
  },
 methods:{

    //自定义事件--通知父亲--修改dialogVisible
    close() {
      this.$emit("changeDialog");
    },
      //修改数据
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log("获取输入的信息", this.trainForm);
          // Tid, uname,Tate,Type, Tup,Tdown
          let {
                Tid,
                uname,
                Tate,
                dup,
                Type,
                Tup,
                Tdown
          } = this.trainForm;
          //判断当前的确定按钮类型：
          if (this.title === "添加培训信息") {
            console.log("添加培训信息");
            this.$api
              .addTrain({     
                  Tid,
                uname,
                Tate,
                dup,
                Type,
                Tup,
                Tdown
              })
              .then((res) => {
                console.log("添加---实现---", res.data);
                if (res.data.status === 200) {
                  //成功
                  this.$parent.http(1); //更新父组件列表数据
                  this.$message({
                    message: "添加培训成功",
                    type: "success",
                  });
                  //清空表单
                  this.clearForm();
                } else {
                  this.$message.error("错了哦，这是一条错误消息");
                }
              });
          } else {
            console.log("编辑培训信息");
            this.$api
              .updateTrain({
      
                  Tid,
                uname,
                Tate,
               dup,
                Type,
                Tup,
                Tdown
              })
              .then((res) => {
                console.log(res.data);
                if (res.data.status === 200) {
                  this.$parent.http(1); //更新父组件列表数据
                  this.$message({
                    message: "修改培训成功",
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
       this.trainForm={
            uname: '',
  
            dup:'',
            Tate: '',
            Type: '',
            Tup: '',
            Tdown:'',
      };
    },   
  },
 };
</script>

<style lang='less' scoped>
</style>