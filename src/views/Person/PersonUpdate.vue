<template>
  <!-- 
      ref="upload" 获取dom元素 --upload  
      action=''    必选参数，上传的地址	string
      :on-preview="handlePreview" 点击文件列表中已上传的文件时的钩子 function(file)
      on-remove	    文件列表移除文件时的钩子	
      on-success	文件上传成功时的钩子	
      on-error	    文件上传失败时的钩子	
      on-progress	文件上传时的钩子	
      auto-upload	是否在选取文件后立即进行上传
      file-list	    上传的文件列表, 

 -->
  <el-upload
    class="upload-demo"
    ref="upload"
    :action="url"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-success='successUpload'
    :file-list="fileList"
    :auto-upload="false"
  >
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button
      style="margin-left: 10px"
      size="small"
      type="success"
      @click="submitUpload"
      >上传到服务器</el-button
    >
  </el-upload>
</template>

<script>
import base from '../../api/base';
export default {
  data() {
    return {
        url:base.uploadUrl,//图片地址服务器
        fileList: [],
    };
  },
  methods: {
    //点击上传按钮--submit()	手动上传文件列表
    submitUpload() {
      this.$refs.upload.submit();
    },
    /**
     * 上传成功的函数
     */
    successUpload(response,file,fileList){
        console.log('上传成功',response,file,fileList);
         this.$message({
          message: '恭喜你，图片上传成功',
          type: 'success'
        });
        //把成功的数据接口 response传递给 父组件
        //http://localhost:8989/xxx.jpg
        let imgUrl = base.host +'/'+ response.url.slice(7);
        this.$emit('sendImg',imgUrl)

    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  },  
};
</script>

<style>
</style>