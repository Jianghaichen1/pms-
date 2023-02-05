<template>
    <div class="notice">
		<!--1.搜索区域-->
		<div class="header">
			
		<el-menu class="el-menu-demo" mode="horizontal" active-text-color="#E5E5E5">
				<el-menu-item >
					<!-- change	仅在输入框失去焦点或用户按下回车时触发 -->
				<el-input @change="searchInp" class="input"   v-model="input"  placeholder="输入关键词搜索"  clearable>
				</el-input>	
				</el-menu-item> 
				<el-menu-item>
					<el-button  class="b1"  icon="el-icon-search" >查询</el-button>
				
				</el-menu-item>

		</el-menu>
		</div>
		<!--2.表格数据展示区域区域-->
		<div class="wrapper">
			<template>
 		<el-table :data="tableData" style="width: 100%" max-height="600">
			<el-table-column class="date" fixed prop="date" label="发布时间" width="150" show-overflow-tooltip></el-table-column>
			
				 <el-table-column class="name" center prop="name" label="公告标题" width="400" >
      			 </el-table-column>
				    <el-table-column prop="text" label="公告信息" width="500">
      			 </el-table-column>
      			 <el-table-column prop="dep" label="发布部门" width="260">
      			 </el-table-column>
				 <el-table-column prop="id" label="发布时间" width="300">

      			 </el-table-column>
  
		</el-table>
		</template>
		</div>
	
		<!--3.分页-->
		<!-- //数据回传 :total-->
		<MyPagination :currentPage="currentPage" :total='total' :pageSize='pageSize' @changePage='changePage' />

		
						
				
		
 	</div>
</template>

<script >
	//子组件 分页
	
	import MyPagination from '../../components/MyPagination.vue';
	
	
	export default {		
		components:{
   		 //注册组件
		MyPagination,
	},	
		data(){
			return{
				currentPage:1,////选中的高亮页码
				input:'',
				tableData:[],
				total:10,
				pageSize:1,
				type:1,
				list:1,
			
				
			};
		},
	methods:{

			//分页页码
			changePage(num){
				// this.http(num);
				this.currentPage=num;
				//判断是显示的用户列表数据还是搜索的数据
				if(this.type==1){
					this.http(num);//用户列表

				}else{
					//搜索分页 1 2 list=[0,1,2,3.....] 
					console.log('搜索分页处理----');
					this.tableData=this.list.slice((num-1)*3,num*3);		
					
				}
			},
			//搜索查询数据
			searchInp(val){
				// console.log('搜索-----',val);
				if(!val){
					//搜索为空 显示用户列表
					this.http(1);
					this.currentPage=1;
					this.type=1;
					return;

				}
				this.$api.getSearchNotice({
					search:val
				}).then(res=>{
					console.log('搜索-----',res.data);
					this.currentPage=1;  //有数据页码就返回为1
					if(res.data.status===200){
						//获取搜索的总数据条数--数据分割
						this.list=res.data.result;
						this.tableData=res.data.result;
						//处理分页
						this.total=res.data.result.lrngth;
						this.pageSize=3;
						this.tableData=res.data.result.slice(0,3);
						this.type=2;
					}else{
						this.tableData=[];
						this.type=2;
						this.total=1;
						this.pageSize=1;
					}
				})
			},
			
		
			// 封装 用户列表获取
			http(page){
				this.$api.getNoticeList({
					page,
				})
				.then(res=>{
					console.log(res.data);
					if(res.data.status===200){
							//判断状态码才能进行操作
							this.tableData=res.data.data;//数据列表
							this.total=res.data.total;
							this.pageSize=res.data.pageSize;
					}
				
				});
			},
		},
			
			//生命周期函数  视图
		created(){
				this.http(1);
			},
	 
	};
</script>

<style lang="less" scoped>
	
	
	.notice{
		margin: 20px;
		margin-right: 100px;
		margin-left: 100px;
	}
	.header{
		button{
			margin-right: 20px;
			
		}
	 }
	 
	 .wrapper{
		 margin-top: 20px;
		 
	 }
	
	  .input /deep/ .el-input__inner {
   			width: 200px;
  	}
	 
	  
</style>