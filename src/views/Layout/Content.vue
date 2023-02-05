<template>
	<!-- 右侧内容区域 -->
	<div>
		
		<div class="header">
			<!-- 顶部导航条 -->
		
		<el-menu
  			class="el-menu-demo"
  			mode="horizontal"
			text-color="black"
			active-text-color="#E5E5E5">
	<el-menu-item >
		
		<i v-if='!isCollapse' @click="changeMenu" class="iconfont icon-shousuo"></i>
		<i v-else @click="changeMenu" class="iconfont icon-zengjiasuojinliang"></i>
	</el-menu-item> 
	
		
		 <div class="user">
          <span> 欢迎：{{users.user }}</span>
          <i   style="	font-size: 30px;"  class="el-icon-switch-button" @click="loginout"></i>
        </div>
		</el-menu>


		</div>
		<!--内容区域 路由出口-- >
		  test <div style="height: 1200px;width: 200px;background: pink;"></div> -->
			<div class="content">
				<router-view />
			</div>
			
	  
	</div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  props: ["isCollapse"],
  computed: {
    ...mapState("loginModule", ["users"]),
  },
  methods: {
    ...mapMutations("loginModule", ["clearUser"]),
			changeMenu(){
				 //点击图标 切换父组件的数据 isCollapse
				this.$emit('changeCollapse')
			},loginout(){
				//退出登录
				//清空本地存储
				this.clearUser()
				localStorage.removeItem('user')
				this.$router.push('/login')
				
			}
		}
	}

</script>

<style lang="less" scoped>
	.iconfont{
			font-size: 30PX;
	}

	 .input /deep/ .el-input__inner {
   			 border-radius: 2.64rem !important;
			float:center;
  	}
	 .user {
		margin-top: 10px;
		float: right;
		padding-right: 20px;
		display: flex;
		margin-left: 20px;
    span {
		font-size: 30px;
      position: relative;
      top: -4px;
      margin-right: 10px;
    }
  }
	
</style>