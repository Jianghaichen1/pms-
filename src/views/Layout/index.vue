<template>
	<div class="layout">
		<!-- 左侧导航区域-->
         <MyMenu  class="menu" :isCollapse='isCollapse' />
            
         
        <!-- 右侧内容区域-->
         <Content class="content" :class="{isActive:isCollapse}" @changeCollapse='changeCollapse' :isCollapse='isCollapse'/>
	</div>
</template>

<script>
//子组件
import MyMenu from './MyMenu.vue'
import Content  from './Content.vue'

  export default {
		components:{
			//注册组件
             MyMenu,
             Content
        },
        data(){
          return{
            isCollapse:false,
          }
        },
        methods:{
          changeCollapse(){
               this.isCollapse=!this.isCollapse;
          }
        }
	}
</script>
<style lang='less' scoped>

    .layout{
        .menu{
            // width: 200px;
            // min-height: 500px;
            background: rgb(180, 180, 180);
            
            //固定定位
            position: fixed;
            top:0;
            bottom: 0;
           
          
        }
        .content{
          margin-left: 200px;
          
        }
        .isActive{
            margin-left:64px;
        } 
    }

</style>