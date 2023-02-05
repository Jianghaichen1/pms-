import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import api from './api/index'
import store from './store'
import './assets/css/reset.css'
import './router/permission'
//导入所有 并重命名
import * as echarts from 'echarts'


Vue.prototype.$echarts=echarts;

Vue.prototype.$api=api;
Vue.config.productionTip = false
Vue.use(ElementUI);

//持久化
let user=localStorage.getItem('user')
if(user){
   //转化
  user=JSON.parse(user);
 
  store.commit('loginModule/setUser',user) 
}

new Vue({
  el:'#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
