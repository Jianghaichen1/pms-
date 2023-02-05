     //路由接口
//导入 jsonwebtoken and 密钥
//config.jwtsecert


const jwt=require('jsonwebtoken')
const config =require('./secert');
const express=require('express');
const router= express.Router();
//导入数据库  sqlFun('sql',[],res=>{})
const sqlFn=require('./mysql');
 
//图片模块
const multer =require('multer');
const fs=require('fs');
//登录接口

/**
 * 语法：
 * 如60，"2 days"，"10h"，"7d"，Expiration time，过期时间
 *  jwt.sign({},'秘钥','过期时间,{expiresIn:20*1,'1day''1h'}')
 */

/**
 * 登录 login
 * 接受的字段：Uid,Upass
 
 */
 router.post('/login', (req, res) => {
    let {username,password } = req.body
    //请求数据库
    let sql = "select * from user where username=? and password=?";
    let arr = [username, password]
    sqlFn(sql, arr, result => {
        if (result.length > 0) {
            let token = jwt.sign({
                username: result[0].username,
                id: result[0].id
            }, config.jwtSecert, {
                expiresIn: 20 * 1
            })
            res.send({
                status: 200,
                data: token
            })
        } else {
            res.send({
                status: 404,
                msg: '信息错误'
            })
        }

    })
})




/**
 * 用户列表：获取分页 {total:'',arr:[{},{},{}],pagesize:8,}
 * 参数：page 页码
 */
router.get('/personList', (req, res) => {
    const page = req.query.page || 1;
    const sqlLen = "select * from user where username";
    sqlFn(sqlLen, null, data => {
        let len = data.length;
        const sql = "select * from user order by username desc limit 8 offset " + (page - 1) * 8;
        sqlFn(sql, null, result => {
            if (result.length > 0) {
                res.send({
                    status: 200,
                    data: result,
                    pageSize: 8,
                    total: len
                })
            } else {
                res.send({
                    status: 500,
                    msg: "暂无数据"
                })
            }
        })
    })
})

/**
 * 用户查询接口 search
 * 参数：search
 */
 router.get("/search", (req, res) => {
    var search = req.query.search;
    const sql = "select * from user where concat(`dup`,`Uphone`,`name`) like '%" + search + "%'";
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})

  

/**
 * 上传图片 post请求 upload
 * 说明：
 *  1.后台安装 multer 模块   同时引入fs模块
 *  2.router.js入口文件导入模块
 *      const fs=require('fs')
        const multer=require('multer')
 *  3.上传图片 
 * 
 */

        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, "./upload/")
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + "-" + file.originalname)
            }
        })
        
        var createFolder = function (folder) {
            try {
                fs.accessSync(folder);
            } catch (e) {
                fs.mkdirSync(folder);
            }
        }
        
        var uploadFolder = './upload/';
        createFolder(uploadFolder);
        var upload = multer({
            storage: storage
        });
        
        router.post('/upload', upload.single('file'), function (req, res, next) {
            var file = req.file;
            console.log('文件类型：%s', file.mimetype);
            console.log('原始文件名：%s', file.originalname);
            console.log('文件大小：%s', file.size);
            console.log('文件保存路径：%s', file.path);
            res.json({
                res_code: '0',
                name: file.originalname,
                url: file.path
            });
        });
        

 /**
 * 薪资添加
 * 参数： udp,name,Aup,Adown,type,Alocation
 */
  router.get("/insertPerson", (req, res) => {
    /**
     * 获取参数
     */

     var dup = req.query.dup || "";
    var name = req.query.name || "";
    var Usex = req.query.Usex || "";
    var Uphone = req.query.Uphone || "";
    var Uyear = req.query.Uyear || "";
    var Uhome = req.query.Uhome || "";
    var Unation = req.query.Unation || "";
    var Uvocation = req.query.Uvocation || "";
    

    const sql = "insert into user values (null,null,?,null,?,?,?,?,?,?,?)"
    var arr = [dup,name,Usex,Uphone,Uyear,Uhome,Unation,Uvocation];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})




/**
 * 用户删除接口 id
 */
router.get("/deletePersonById", (req, res) => {
    var username = req.query.username;
    const sql = "delete from user where username=?"
    const arr = [username];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})



/**
 * 修改用户信息
 */

 router.get("/updatePerson", (req, res) => {
    var username = req.query.username || "";
    var dup = req.query.dup || "";
    var Uimg = req.query.Uimg || "";
    var name = req.query.name || "";
    var Usex = req.query.Usex || "";
    var Uphone = req.query.Uphone || "";
    var Uyear = req.query.Uyear || "";
    var Uhome = req.query.Uhome || "";
    var Unation = req.query.Unation || "";
    var Uvocation = req.query.Uvocation || "";

    var sql = "update user set dup=?,Uimg=?,name=?,Usex=?,Uphone=?,Uyear=?,Uhome=?,Unation=?,Uvocation=? where username=?";
    var arr = [dup,Uimg,name,Usex,Uphone,Uyear,Uhome,Unation,Uvocation,username];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "修改成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "修改失败"
            })
        }
    })
})



/**
 * 公告列表：获取分页 {total:'',arr:[{},{},{}],pagesize:8,}
 * 参数：page 页码
 */
 router.get('/noticeList', (req, res) => {
    const page = req.query.page || 1;
    const sqlLen = "select * from notice where id";
    sqlFn(sqlLen, null, data => {
        let len = data.length;
        const sql = "select * from notice order by id desc limit 8 offset " + (page - 1) * 8;
        sqlFn(sql, null, result => {
            if (result.length > 0) {
                res.send({
                    status: 200,
                    data: result,
                    pageSize: 8,
                    total: len
                })
            } else {
                res.send({
                    status: 500,
                    msg: "暂无数据"
                })
            }
        })
    })
})

/**
 * 公告查询接口 searchNotice
 * 参数：searchNotice
 */
 router.get("/searchNotice", (req, res) => {
    var search = req.query.search;
    const sql = "select * from notice where concat(`id`,`name`,`text`,`dep`,`date`) like '%" + search + "%'";
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})



/**
 * 考勤列表：获取分页 {total:'',arr:[{},{},{}],pagesize:8,}
 * 参数：page 页码
 */
 router.get('/attendList', (req, res) => {
    const page = req.query.page || 1;
    const sqlLen = "select * from attend where Aid";
    sqlFn(sqlLen, null, data => {
        let len = data.length;
        const sql = "select * from attend order by Aid desc limit 8 offset " + (page - 1) * 8;
        sqlFn(sql, null, result => {
            if (result.length > 0) {
                res.send({
                    status: 200,
                    data: result,
                    pageSize: 8,
                    total: len
                })
            } else {
                res.send({
                    status: 500,
                    msg: "暂无数据"
                })
            }
        })
    })
})

/**
 * 考勤查询接口 searchNotice
 * 参数：searchNotice
 */
 router.get("/searchAttend", (req, res) => {
    var search = req.query.search;
    const sql = "select * from attend where concat(`Aid`,`udp`,`name`,`type`,`Alocation`) like '%" + search + "%'";
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})


      /**
 * 考勤添加
 * 参数： udp,name,Aup,Adown,type,Alocation
 */
       router.get("/insertAttend", (req, res) => {
        /**
         * 获取参数
         */
    
        var name = req.query.name || "";
        var udp = req.query.udp || "";
        var Aup = req.query.Aup || "";
        var Adown = req.query.Adown || "";
        var type = req.query.type || "";
        var Alocation = req.query.Alocation || "";
    
        const sql = "insert into attend values (null,?,?,?,?,?,?)"
        var arr = [udp,name,Aup,Adown,type,Alocation];
        sqlFn(sql, arr, result => {
            if (result.affectedRows > 0) {
                res.send({
                    status: 200,
                    msg: "添加成功"
                })
            } else {
                res.send({
                    status: 500,
                    msg: "添加失败"
                })
            }
        })
    })
    
    
    /**
     * 考勤删除接口 id
     */
    router.get("/deleteAttendById", (req, res) => {
        var Aid = req.query.Aid;
        const sql = "delete from attend where Aid=?"
        const arr = [Aid];
        sqlFn(sql, arr, result => {
            if (result.affectedRows > 0) {
                res.send({
                    status: 200,
                    msg: "删除成功"
                })
            } else {
                res.send({
                    status: 500,
                    msg: "删除失败"
                })
            }
        })
    })
    
    
    
    /**
     * 修改考勤信息
     */
    
     router.get("/updateAttend", (req, res) => {
        
        var Aid = req.query.Aid || "";
        var name = req.query.name || "";
        var udp = req.query.udp || "";
        var Aup = req.query.Aup || "";
        var Adown = req.query.Adown || "";
        var type = req.query.type || "";
        var Alocation = req.query.Alocation || "";
    
        var sql = "update attend set udp=?,name=?,Aup=?,Adown=?,type=?,Alocation=? where Aid=?";
        var arr = [udp,name,Aup,Adown,type,Alocation,Aid];
        sqlFn(sql, arr, result => {
            if (result.affectedRows > 0) {
                res.send({
                    status: 200,
                    msg: "修改成功"
                })
            } else {
                res.send({
                    status: 500,
                    msg: "修改失败"
                })
            }
        })
    })
    

/**
 * 薪资列表：获取分页 {total:'',arr:[{},{},{}],pagesize:8,}
 * 参数：page 页码
 */
 router.get('/wagesList', (req, res) => {
    const page = req.query.page || 1;
    const sqlLen = "select * from wages where Wid";
    sqlFn(sqlLen, null, data => {
        let len = data.length;
        const sql = "select * from wages order by Wid desc limit 8 offset " + (page - 1) * 8;
        sqlFn(sql, null, result => {
            if (result.length > 0) {
                res.send({
                    status: 200,
                    data: result,
                    pageSize: 8,
                    total: len
                })
            } else {
                res.send({
                    status: 500,
                    msg: "暂无数据"
                })
            }
        })
    })
})

/**
 * 薪资查询接口 searchWages
 * 参数：searchNotice
 */
 router.get("/searchWages", (req, res) => {
    var search = req.query.search;
    const sql = "select * from wages where concat(`Wid`,`name`,`udp`,`Wdate`) like '%" + search + "%'";
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})


  /**
 * 薪资添加
 * 参数： udp,name,Aup,Adown,type,Alocation
 */
   router.get("/insertWages", (req, res) => {
    /**
     * 获取参数
     */

    var udp = req.query.udp || "";
    var name = req.query.name || "";
    var Wbasic = req.query.Wbasic || "";
    var Wbonus = req.query.Wbonus || "";
    var Wfine = req.query.Wfine || "";
    var Wup = req.query.Wup || "";
    var date = req.query.date || "";
    var Wdown = req.query.Wdown || "";

    const sql = "insert into wages values (null,?,?,?,?,?,?,?,?)"
    var arr = [udp,name,Wbasic,Wbonus,Wfine,Wup,date,Wdown];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})


/**
 * 薪资删除接口 id
 */
router.get("/deleteWagesById", (req, res) => {
    var Wid = req.query.Wid;
    const sql = "delete from wages where Wid=?"
    const arr = [Wid];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})



/**
 * 修改薪资信息
 */

 router.get("/updateWages", (req, res) => {
    
    var Wid = req.query.Wid || "";
    var udp = req.query.udp || "";
    var name = req.query.name || "";
    var Wbasic = req.query.Wbasic || "";
    var Wbonus = req.query.Wbonus || "";
    var Wfine = req.query.Wfine || "";
    var Wup = req.query.Wup || "";
    var Wdate = req.query.Wdate || "";
    var Wdown = req.query.Wdown || "";

    var sql = "update wages set udp=?,name=?,Wbasic=?,Wdown=?,Wdate=?,Wbonus=?,Wfine=?,Wup=? where Wid=?";
    var arr = [udp,name,Wbasic,Wbonus,Wfine,Wup,Wdate,Wdown,Wid];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "修改成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "修改失败"
            })
        }
    })
})


/**
 * 培训列表：获取分页 {total:'',arr:[{},{},{}],pagesize:8,}
 * 参数：page 页码
 */
 router.get('/trainList', (req, res) => {
    const page = req.query.page || 1;
    const sqlLen = "select * from train where Tid";
    sqlFn(sqlLen, null, data => {
        let len = data.length;
        const sql = "select * from train order by Tid desc limit 8 offset " + (page - 1) * 8;
        sqlFn(sql, null, result => {
            if (result.length > 0) {
                res.send({
                    status: 200,
                    data: result,
                    pageSize: 8,
                    total: len
                })
            } else {
                res.send({
                    status: 500,
                    msg: "暂无数据"
                })
            }
        })
    })
})

/**
 * 培训查询接口 searchWages
 * 参数：searchNotice
 */
 router.get("/searchTrain", (req, res) => {
    var search = req.query.search;
    const sql = "select * from train where concat(`Tid`,`uname`,`dup`,`Tate`,`Type`) like '%" + search + "%'";
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})



 /**
 * 培训添加
 * 参数： uname,dup,Tate,Type,Tup,Tdown
 */
  router.get("/insertTrain", (req, res) => {
    /**
     * 获取参数
     */

    var dup = req.query.dup || "";
    var uname = req.query.uname || "";
    var Tate = req.query.Tate || "";
    var Type = req.query.Type || "";
    var Tup = req.query.Tup || "";
    var Tdown = req.query.Tdown || "";
   
  

    const sql = "insert into train values (null,?,?,?,?,?,?)"
    var arr = [uname,dup,Tate,Type,Tup,Tdown];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})


/**
 * 培训删除接口 id
 */
router.get("/deleteTrainById", (req, res) => {
    var Tid = req.query.Tid;
    const sql = "delete from train where Tid=?"
    const arr = [Tid];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})



/**
 * 修改培训信息
 */

 router.get("/updateTrain", (req, res) => {

    var Tid = req.query.Tid || "";
    var dup = req.query.dup || "";
    var uname = req.query.uname || "";
    var Tate = req.query.Tate || "";
    var Type = req.query.Type || "";
    var Tup = req.query.Tup || "";
    var Tdown = req.query.Tdown || "";

    var sql = "update train set uname=?,dup=?,Tate=?,Type=?,Tup=?,Tdown=? where Tid=?";
    var arr = [uname,dup,Tate,Type,Tup,Tdown,Tid];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "修改成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "修改失败"
            })
        }
    })
})



/**
 * 奖惩列表：获取分页 {total:'',arr:[{},{},{}],pagesize:8,}
 * 参数：page 页码
 */
 router.get('/randpList', (req, res) => {
    const page = req.query.page || 1;
    const sqlLen = "select * from randp where Rid";
    sqlFn(sqlLen, null, data => {
        let len = data.length;
        const sql = "select * from randp order by Rid desc limit 8 offset " + (page - 1) * 8;
        sqlFn(sql, null, result => {
            if (result.length > 0) {
                res.send({
                    status: 200,
                    data: result,
                    pageSize: 8,
                    total: len
                })
            } else {
                res.send({
                    status: 500,
                    msg: "暂无数据"
                })
            }
        })
    })
})

/**
 * 奖惩查询接口 searchWages
 * 参数：searchNotice
 */
 router.get("/searchRandp", (req, res) => {
    var search = req.query.search;
    const sql = "select * from randp where concat(`Rid`,`uname`,`dup`,`Rdate1`,`Rdate2`,`Rtype`) like '%" + search + "%'";
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})

 /**
 * 奖惩添加
 * 参数： uname,dup,Rsum,Rdate1,Rtype,Reason,Rtype2
 */
  router.get("/insertRandp", (req, res) => {
    /**
     * 获取参数
     */

    var dup = req.query.dup || "";
    var uname = req.query.uname || "";
    var Rdate1 = req.query.Rdate1 || "";
    var Rtype = req.query.Rtype || "";
    var Rsum = req.query.Rsum || "";
    var Reason = req.query.Reason || "";
    var Rdate2 = req.query.Rdate2 || "";
  

    const sql = "insert into randp values (null,?,?,?,?,?,?,?)"
    var arr = [uname,dup,Rsum,Rdate1,Rtype,Reason,Rdate2];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})


/**
 * 薪资删除接口 id
 */
router.get("/deleteRandpById", (req, res) => {
    var Rid = req.query.Rid;
    const sql = "delete from randp where Rid=?"
    const arr = [Rid];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})



/**
 * 修改薪资信息
 */

 router.get("/updateRandp", (req, res) => {
    
    var Rid = req.query.Rid || "";
    var dup = req.query.dup || "";
    var uname = req.query.uname || "";
    var Rdate1 = req.query.Rdate1 || "";
    var Rtype = req.query.Rtype || "";
    var Rsum = req.query.Rsum || "";
    var Reason = req.query.Reason || "";
    var Rdate2 = req.query.Rdate2 || "";

    var sql = "update randp set uname=?,dup=?,Rsum=?,Rdate1=?,Rtype=?,Reason=?,Rdate2=? where Rid=?";
    var arr = [uname,dup,Rsum,Rdate1,Rtype,Reason,Rdate2,Rid];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "修改成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "修改失败"
            })
        }
    })
})





module.exports=router