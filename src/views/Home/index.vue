<template>
  <div class="home">
    <!-- 顶部区域 -->
   <div class="header">
      <div class="item">
        总访问量
        <div class='num'>726,520</div>
        <div class="bottom">今日访问量：342</div>
      </div>
      <div class="item">考勤量
        <div class='num'>836,175</div>
         <div class="bottom">今日考勤量：442</div>
      </div>
      
    </div>
  

    <!-- 访问时长 -->
    <div class="content">
      <div class="time-info">
        <div class="title">月考勤量</div>
			  <div id="month" style="width: 100%; height: 360px"></div>
      </div>
      	<div class="area">
			<div class="title">位置分布</div>
			  <div id="location" style="width: 100%; height: 360px"></div>

		</div>
    </div>

    <!-- 最新内容 -->
    <div class="home-footer">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>最新内容</span>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{ "列表内容 " + o }}
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>快捷入口</span>
        </div>
        <div class="text item">
          <el-button type="primary">员工管理</el-button>
          <el-button>消息管理</el-button>
          <el-button>内容管理</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

	// 安装：npm install echarts
		//使用方式
		//1.导入echarts在组件内使用
		//2.导入全局 挂载原型上  全局使用
		//3.开发成vue插件	

		//1.使用 main.js 全局挂载
		//导入所有 并重命名
			import * as echarts from 'echarts'
			Vue.prototype.$echarts=echarts;
		//2.直接使用
			this.$echarts.xxx	
<script>
	export default {
	//生命周期函数  mounted
		mounted(){
				this.bar();
				this.location();
			},
	methods:{
		bar(){
			 // 基于准备好的dom，初始化echarts实例
			 //挂载全局
		var myChart = this.$echarts.init(document.getElementById('month'));

		// 指定图表的配置项和数据
		var option = {
			
			tooltip: {},
			
			xAxis: {
			data: ['机电信息学院', '城乡建设学院', '农业园艺学院', '经济贸易学院', '畜牧兽医学院', '风景园林学院']
			},
			yAxis: {},
			series: [
			{
				name: '数量',
				type: 'bar',
				data: [2499, 2300,3544,2672,2342,2105]
			}
			]
		};

		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		

		},
		location(){
				var myChart = this.$echarts.init(document.getElementById('location'));

				
		}
	}
	 
	}
</script>


<style lang='less' scoped>
.home{
  margin: 10px;
}
.header {
  display: flex;
  padding-right: 30px;
  .item {
    flex: 1;
    height: 100px;
    padding: 10px;
    background: #fff;
    border-radius: 10px;
    margin-left: 20px;
    margin-right: 20px;
    font-weight: bold;
    color: #fff;
    // text-align: center;
    position: relative;
    .num {
      font-size: 22px;
      margin: 10px;
          color: #fff;
    }
    .bottom {
      position: absolute;
      border-top: 1px solid rgb(246, 245, 245);
      padding: 10px 20px;
      bottom: 0;
      right: 0;
      left: 0;
          color: #fff;
          font-weight: normal;
    }
  }
   
   .item:nth-child(1){
    background-image: linear-gradient(#04C4CB,#00CC0E);
  }
   .item:nth-child(2){
    background-image: linear-gradient(#1cd2f1,#39717a);
  }
}
.content {
  margin: 20px;
  display: flex;
  height: 400px;
  .time-info {
    flex: 2;
    background: #fff;
    margin-right: 20px;
    padding: 10px;
  }
  .area {
    flex: 1;
    background: #fff;
    padding: 10px;
  }
}
.home-footer {
  display: flex;
  padding-left: 20px;
  margin-bottom:20px;
  .box-card {
    flex: 1;
    margin-right: 30px;
    span {
      font-weight: 600;
    }
  }
}
</style>