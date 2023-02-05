// 接口路径配置：
    const base={
        login:'/api/api/login',//登录接口
        host:'http://localhost:8989',//基础域名

       

        //person
        personList:'/api/api/personList', //用户列表
        search:'/api/api/search',//用户搜索
        uploadUrl:'api/api/upload',//图片上传post请求
        addPerson:'/api/api/insertPerson',//用户添加
        deletePerson:'/api/api/deletePersonById',//删除用户
        updatePerson:'/api/api/updatePerson',//修改用户

        //notice
        noticeList:'api/api/noticeList',//公告列表
        searchNotice:'/api/api/searchNotice',//公告搜索
        

        //train
        trainList:'api/api/trainList',//培训列表
        searchTrain:'/api/api/searchTrain',//培训搜索
        addTrain:'/api/api/insertTrain',//培训添加
        deleteTrain:'/api/api/deleteTrainById',//删除培训
        updateTrain:'/api/api/updateTrain',//修改培训 


         //wages
         wagesList:'api/api/wagesList',//薪资列表
         searchWages:'/api/api/searchWages',//薪资搜索
         addWages:'/api/api/insertWages',//薪资添加
         deleteWages:'/api/api/deleteWagesById',//删除薪资
         updateWages:'/api/api/updateWages',//修改薪资  

         //attend
         attendList:'api/api/attendList',//考勤列表
         searchAttend:'/api/api/searchAttend',//考勤搜索
         addAttend:'/api/api/insertAttend',//考勤添加
         deleteAttend:'/api/api/deleteAttendById',//删除考勤
         updateAttend:'/api/api/updateAttend',//修改考勤  


          //randp
          randpList:'api/api/randpList',//考勤列表
          searchRandp:'/api/api/searchRandp',//考勤搜索
          addRandp:'/api/api/insertRandp',//考勤添加
          deleteRandp:'/api/api/deleteRandpById',//删除考勤
          updateRandp:'/api/api/updateRandp',//修改考勤  


    }

    export default base;
