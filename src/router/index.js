import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from  "../views/Login/Login.vue";
import Layout from '../views/Layout/index.vue';
import Home from '../views/Home/index.vue';



//异步架构
const Person=()=>import('../views/Person/Person.vue')
const Notice=()=>import('../views/Notice/Notice.vue')
const Attend=()=>import('../views/Attend/Attend.vue')
const Randp=()=>import('../views/Randp/Randp.vue')
const Train=()=>import('../views/Train/Train.vue')
const Wages=()=>import('../views/Wages/Wages.vue')




//子级路由
const AddPerson=()=>import('../views/Person/AddPerson.vue')
Vue.use(VueRouter)
/*同级路由配置*/ 
const routes = [
  {
    path:'',
    component:Layout,
	//路由拦截
    //路由元信息
    meta:{
      isLogin:true
    },
     children:[
      {
        path:'/',
        name:'Home',
        component:Home
      },{
        path:'/person',
        name:'Person',
        component:Person
      },{
          path:'/add-person',
          name:'AddPerson',
          component:AddPerson
      },{
        path:'/notice',
        name:'Notice',
        component:Notice
      },{
        path:'/attend',
        name:'Attend',
        component:Attend
      },{
        path:'/randp',
        name:'Randp',
        component:Randp
      },{
        path:'/train',
        name:'Train',
        component:Train
      },,{
        path:'/wages',
        name:'Wages',
        component:Wages
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  
  }
]

const router = new VueRouter({
  routes
})


export default router

