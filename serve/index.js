//搭建exprss服务
const express=require('express')
const app=express()
//导入路由
const router=require('./router')

//post 请求表单数据
app.use(express.urlencoded({extended:true}))

//静态文件托管   AddPersonDialog 将图片传递给父组件
//upload 文件公开  http:localhost:8989/+文件名
app.use(express.static('upload'))

app.use('/api',router)

app.listen(8989,()=>{
    console.log(8989);
})