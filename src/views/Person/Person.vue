<template>
    <div class="person">
		<!--1.搜索区域-->
		<div class="header">
			
		<el-menu class="el-menu-demo" mode="horizontal" active-text-color="#E5E5E5">
				<el-menu-item >
					<!-- change	仅在输入框失去焦点或员工按下回车时触发 -->
				<el-input @change="searchInp" class="input"   v-model="input"  placeholder="输入关键词搜索"  clearable></el-input>
					
				</el-menu-item> 
				<el-menu-item>
	
					<el-button  class="b1"  icon="el-icon-search" >查询</el-button>
					
       	 <el-button  style="background-color: #26DE4C;border-color: #26DE4C ;" type="primary" @click="addPerson">添加</el-button>
          
	
				</el-menu-item>
				
	 
		</el-menu>
		</div>
		<!--2.表格数据展示区域区域-->
		<div class="wrapper">
			<el-table :data="tableData" border>
			 <el-table-column  type="selection" width="55"></el-table-column>
     			 <el-table-column class="username"  sortable prop="username" label="编号" width="100"  show-overflow-tooltip>
     			 </el-table-column>
				 <el-table-column class="dup"  sortable prop="dup" label="部门" width="100" >
     			 </el-table-column>
      			 <el-table-column  prop="Uimg" label="头像" width="100" show-overflow-tooltip>
      			 </el-table-column>
      			 <el-table-column  prop="name" label="姓名" width="100">
      			 </el-table-column>
			     <el-table-column prop="Usex" label="性别" width="50">
     			 </el-table-column>
				  <el-table-column prop="Uyear" sortable  label="生日" width="150" show-overflow-tooltip>
     			 </el-table-column>
      			 <el-table-column  prop="Uphone" label="手机" width="150">
      			 </el-table-column>
				 <el-table-column  prop="Unation" label="民族" width="50">
      			 </el-table-column>
				 <el-table-column  prop="Uvocation" label="学历" width="50">
      			 </el-table-column>
      			 <el-table-column prop="Uhome" label="地址" width="260">
      			 </el-table-column>
				 <el-table-column prop="operate" label="操作" width="300">
	<template slot-scope="scope">
<!-- <el-button size="mini">查看</el-button> -->
<el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit">编辑</el-button>
<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete" >删除</el-button>	
    </template>
      			 </el-table-column>
            </el-table>
		</div>
		<!-- 全选 -- 反选 -- 批量删除 -->
    <!-- <div class="bottom">
      <el-button type="primary" size="small">全选</el-button>
      <el-button type="primary" size="small">反选</el-button>
      <el-button type="primary" size="small">批量删除</el-button>
    </div> -->
		<!--3.分页-->
		<!-- //数据回传 :total-->
		<MyPagination :currentPage="currentPage" :total='total' :pageSize='pageSize' @changePage='changePage' />

		<!--显示弹框组件 操作子组件
			1.父传子 2.children 3.ref
		-->
		<PersonDialog ref="dialog" :title="title" :rowData="rowData" />
						
				
		
 	</div>
</template>

<script >
	//子组件 分页
	
	import MyPagination from '../../components/MyPagination.vue';
	import PersonDialog from './PersonDialog.vue';
	
	export default {		
		components:{
   		 //注册组件
		MyPagination,
		PersonDialog
	
	},	
		data(){
			return{
				dialogVisible:false,
				currentPage:1,////选中的高亮页码
				input:'',
				tableData:[],
				total:10,
				pageSize:1,
				type:1,
				list:1,
				title:"添加员工信息",
				rowData:{}//当前行数据
				
			};
		},
	methods:{
			addPerson(){
					// this.dialogVisible = true;
					//修改子组件实例的数据
					this.$refs.dialog.dialogVisible = true;
					this.title = "添加员工信息";
			},
			changeDialog() {
			this.dialogVisible = false;
			},

			//分页页码
			changePage(num){
				// this.http(num);
				this.currentPage=num;
				//判断是显示的员工列表数据还是搜索的数据
				if(this.type==1){
					this.http(num);//员工列表

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
					//搜索为空 显示员工列表
					this.http(1);
					this.currentPage=1;
					this.type=1;
					return;

				}
				this.$api.getSearch({
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
			
		
			//编辑
			handleEdit(index,row){
				//row={}
				//1.点击编辑按钮 显示弹框
				//2.弹框上回显当前行数据	
				this.$refs.dialog.dialogVisible = true;
				this.title = "编辑员工";
				//传递数据
				// this.rowData = { ...row };
     			this.$refs.dialog.personForm=row;  //方法1：
			},
			//删除
			handleDelete(index,row){
				console.log('删除',index,row);
					 this.$confirm('此操作将永久删除该员工, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
					
					
					//请求删除接口

						this.$api.deletePerson({
							username:row.username
						})  
						.then(res=>{
							console.log('删除成功!',res.data);
							if(res.data.status===200){
								  this.$message({
								  type: 'success',
								  message: '删除成功!'
								});
								//视图更新
								this.http(1);
							}
						})
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});          
					});

			}, 
			
			// 封装 员工列表获取
			http(page){
				this.$api.getPersonList({
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
 
	.person{
		margin: 20px;
	}
	.header{
		button{
			margin-right: 20px;
			
		}
	 }
	 
	
	  .input /deep/ .el-input__inner {
   			width: 200px;
  	}
	 
	  
</style>