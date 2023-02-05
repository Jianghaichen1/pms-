 //跨域
//配置参数

//  devServer.proxy 
//如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请 求代理到 API 服务器

// 	ws:false,
// 	//目标地址
// 	target: 'http://localhost:8081',
// 	//发送请求头host会被设置为target
// 	changeOrigin: true,
// 	//不重写请求地址
// 	pathReWrite:{
// 		'^/':'/',
// 	}
// }

module.exports = {

    devServer: {
		proxy: {
			'/api': {
				target: 'http://localhost:8989', // 接口的域名 
				// secure: false,  // 如果是https接口，需要配置这个参数
				ws:true,		//是否启用websockets
				changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
				pathRewrite: {
					//重写路径
					'^/api':''
				}		
			}
		},
        
    },
};
