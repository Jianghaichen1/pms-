<template>
	<div>
		<!-- <h2>左侧导航</h2> -->
    <!-- 折叠 collapse -->
		   <el-menu
      :default-active="$router.path"
      class="el-menu-vertical-demo"
      text-color="#fff" 
      router
      :collapse="isCollapse" 
      >

      <el-menu-item index="/"  class="b1">
        <i class="el-icon-menu"></i>
        <span slot="title" >首页</span>
      </el-menu-item>

    
      <el-menu-item index="attend"  class="b2">
        <i class="el-icon-notebook-2"></i>
        <span slot="title">考勤管理</span>
      </el-menu-item>

      <el-menu-item index="notice" class="b3">
        <i class="el-icon-message-solid"></i>
        <span slot="title">公告管理</span>
      </el-menu-item>

      

      <el-menu-item index="train"  class="b5">
        <i class="el-icon-s-order"></i>
        <span slot="title">培训管理</span>
      </el-menu-item>

      <el-menu-item index="randp" class="b6">
        <i class="el-icon-reading"></i>
        <span slot="title">奖惩管理</span>
      </el-menu-item>

       <el-menu-item index="wages" class="b7">
        <i class="el-icon-coin"></i>
        <span slot="title">薪资管理</span>
      </el-menu-item>

      <el-menu-item index="person" class="b8">
        <i class="el-icon-coin"></i>
        <span slot="title">员工管理</span>
      </el-menu-item>

        
       
    
     </el-menu>

  
	</div>
</template>

<script >
	export default {
    props:['isCollapse'],//接收来自父类的信息
    data(){
      return{
        //导航展开
           //isCollapse:false
      }
    }
	}
</script>

<style lang="less" scoped >
  .el-menu-vertical-demo{
      border-radius: 0 0 10% 0;
      height:auto;
      background-image:-webkit-linear-gradient(rgb(4, 196, 203),#00CC0E);
        //固定定位
            position: fixed;
            top:0;
            bottom: 0;
       
  }

    .b1:hover{
          /* 悬停的样式 */
        
        background-color: #91e9af !important;
        color: #FFFFFF !important;
        /* 选中的样式 */
    }
    .b1:active {

        background-color: #009D8E;
        color: #FFF;

      }

       .b2:hover{
          /* 悬停的样式 */
        
        background-color: #91e9af !important;
        color: #FFFFFF !important;
        /* 选中的样式 */
    }
    .b2:active {

        background-color: #009D8E;
        color: #FFF;

      }

       .b3:hover{
          /* 悬停的样式 */
        
        background-color: #91e9af !important;
        color: #FFFFFF !important;
        /* 选中的样式 */
    }
    .b3:active {

        background-color: #009D8E;
        color: #FFF;

      }

    .b4:hover{
          /* 悬停的样式 */
        
        background-color: #91e9af !important;
        color: #FFFFFF !important;
        /* 选中的样式 */
    }
    .b4:active {

        background-color: #009D8E;
        color: #FFF;

      }
      .el-menu-vertical-demo:not(.el-menu--collapse) {
          width: 200px;
          min-height: 400px;
        }

     .b5:hover{
          /* 悬停的样式 */
        
        background-color: #91e9af !important;
        color: #FFFFFF !important;
        /* 选中的样式 */
    }
    .b5:active {

        background-color: #009D8E;
        color: #FFF;

      }
       .b6:hover{
          /* 悬停的样式 */
        
        background-color: #91e9af !important;
        color: #FFFFFF !important;
        /* 选中的样式 */
    }
    .b6:active {

        background-color: #009D8E;
        color: #FFF;

      }
       .b7:hover{
          /* 悬停的样式 */
        
        background-color: #91e9af !important;
        color: #FFFFFF !important;
        /* 选中的样式 */
    }
    .b7:active {

        background-color: #009D8E;
        color: #FFF;

      }

 .b8:hover{
          /* 悬停的样式 */
        
        background-color: #91e9af !important;
        color: #FFFFFF !important;
        /* 选中的样式 */
    }
    .b8:active {

        background-color: #009D8E;
        color: #FFF;

      }
</style>