// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from "axios"
import router from './router'
import * as filters from './config/filter'
Vue.prototype.$axios = axios;
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
import instruction from './config/instruction'
Vue.use(instruction)
import   _protypeJs   from './config/_prototypeJs'
Vue.use(_protypeJs)
import Loading from './components/publicComponent/loading/loading'
Vue.use(Loading)
import shoptitle from './components/publicComponent/shoptitle/shoptitle'
Vue.use(shoptitle);
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
Vue.config.productionTip = false;
//获取用户ID
(function(){
  console.log("环境："+process.env.NODE_ENV);
  if(process.env.NODE_ENV == 'production'){//development   //production
    let msg = JS.getAppUserId();
    alert("获取用户id:"+JSON.parse(msg).userId);
    alert("获取入口:"+JSON.parse(msg).entrance);
    alert("用户手机类型:"+JSON.parse(msg).platform);
    if(JSON.parse(msg).userId){
      localStorage.setItem('user',JSON.parse(msg).userId);
      localStorage.setItem('entrance',JSON.parse(msg).entrance);
      localStorage.setItem('platform',JSON.parse(msg).platform);
    }else{
      alert('获取用户id失败，请重新进入');
      JS.closeWebView();
    }
  }

  let myuser = localStorage.getItem('user');
  console.log(myuser+"=========="+typeof(myuser));
  //使用钩子函数对路由进行权限跳转
  router.beforeEach((to, from, next) => {
    if( myuser && myuser != "undefined"){
      next();
    }else {
      alert("非法访问")
    }
  })
})();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
