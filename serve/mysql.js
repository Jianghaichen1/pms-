//连接数据库 1.安装mysql 2.创建连接
    const mysql=require('mysql')

//创建数据库连接
    const client=mysql.createConnection({
        host: 'localhost',  //地址
        user: 'root',      //名称
        password:'',       //密码 xampp集成
        database:'pms',
        port:'3308'
    })
    
    //封装数据库操作语句 sql 语句  参数arr数组  callback 成功 回调函数结果
        function sqlFn(sql,arr,callback){
            client.query(sql,arr,function(error,result){
                if(error){
                    console.log('数据库语句错误！！');
                    return;
                }
                callback(result)
            })
        }
        //导出方法
        module.exports=sqlFn