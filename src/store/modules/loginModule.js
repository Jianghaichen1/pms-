export default {
    //用户信息
    //命名空间
    namespaced:true,
    state:{
        users:{
            user:'',
            token:''
        }
    },
    mutations:{
        //设置用户信息
        setUser(state,payload){
            state.users= payload;
        },
        //清空
        clearUser(state){
            state.users={
                user:'',
                token:''
            }
        }
    },
    actions:{

    },
    getters:{

    }

}