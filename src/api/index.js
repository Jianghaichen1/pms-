//请求方法
    import axios from "axios"
    import base from "./base"
    //引入 node.js
const qs=require('querystring')
    const api={

     
     //登录接口
        getLogin(params) {//params={username:'',password:''}
            //参数转换为字符串
            return axios.post(base.login,qs.stringify(params))
        },
        //用户列表
        //{page:XX}
        getPersonList(params){  
            return axios.get(base.personList,{params})
        },
        
        //搜索用户数据
        getSearch(params){  
            return axios.get(base.search,{params})
        },
        //添加员工
        addPerson(params){
            
            return axios.get(base.addPerson,{params})
 
        },
        //删除用户
        deletePerson(params){
            return axios.get(base.deletePerson,{params})
        },
        //修改用户
        updatePerson(params){
            return axios.get(base.updatePerson,{params})
        },



         //公告列表
        //{page:XX}
        getNoticeList(params){  
            return axios.get(base.noticeList,{params})
        },
        
        //搜索公告数据
        getSearchNotice(params){  
            return axios.get(base.searchNotice,{params})
        },


        //考勤列表
        //{page:XX}
        getAttendList(params){  
            return axios.get(base.attendList,{params})
        },
        
        //搜索考勤数据
        getSearchAttend(params){  
            return axios.get(base.searchAttend,{params})
        },
        //添加考勤
        addAttend(params){
            //params -> {} 参数：udp,name,Aup,Adown,type,Alocation
            return axios.get(base.addAttend,{params})
 
        },
        //删除考勤
        deleteAttend(params){
            return axios.get(base.deleteAttend,{params})
        },
        //修改考勤
        updateAttend(params){
            return axios.get(base.updateAttend,{params})
        },



        //奖惩列表
        //{page:XX}
        getRandpList(params){  
            return axios.get(base.randpList,{params})
        },
        
        //搜索奖惩数据
        getSearchRandp(params){  
            return axios.get(base.searchRandp,{params})
        },
        //添加奖惩
        addRandp(params){
            //params -> {} 参数：udp,name,Aup,Adown,type,Alocation
            return axios.get(base.addRandp,{params})
 
        },
        //删除奖惩
        deleteRandp(params){
            return axios.get(base.deleteRandp,{params})
        },
        //修改奖惩
        updateRandp(params){
            return axios.get(base.updateRandp,{params})
        },

    

        //培训列表
        //{page:XX}
        getTrainList(params){  
            return axios.get(base.trainList,{params})
        },
        
        //搜索培训数据
        getSearchTrain(params){  
            return axios.get(base.searchTrain,{params})
        },
        //添加培训
        addTrain(params){
            //params -> {} 参数：udp,name,Aup,Adown,type,Alocation
            return axios.get(base.addTrain,{params})
 
        },
        //删除培训
        deleteTrain(params){
            return axios.get(base.deleteTrain,{params})
        },
        //修改培训
        updateTrain(params){
            return axios.get(base.updateTrain,{params})
        },

        
        
        //薪资列表
        //{page:XX}
        getWagesList(params){  
            return axios.get(base.wagesList,{params})
        },
        
        //搜索薪资数据
        getSearchWages(params){  
            return axios.get(base.searchWages,{params})
        },
        //添加薪资
        addWages(params){
            //params -> {} 参数：udp,name,Aup,Adown,type,Alocation
            return axios.get(base.addWages,{params})
 
        },
        //删除薪资
        deleteWages(params){
            return axios.get(base.deleteWages,{params})
        },
        //修改薪资
        updateWages(params){
            return axios.get(base.updateWages,{params})
        },


    }
    //导出方法
    export default api