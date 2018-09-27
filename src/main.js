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
Vue.use(_protypeJs);
import Loading from './components/publicComponent/loading/loading'
Vue.use(Loading)
import shoptitle from './components/publicComponent/shoptitle/shoptitle'
Vue.use(shoptitle);
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper);
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
Vue.config.productionTip = false;
//获取用户ID
(function(){
  console.log("环境："+process.env.NODE_ENV);
  // if(process.env.NODE_ENV == 'development'){
  //   JS.getAppUserIdTest(function (msg) {
  //     alert("测试："+msg);
  //     alert("获取用户id:"+JSON.parse(msg).userId);
  //     alert("获取入口:"+JSON.parse(msg).entrance);
  //     alert("用户手机类型:"+JSON.parse(msg).platform);
  //   })
  // }
  if(process.env.NODE_ENV == 'production'){//development   //production
    let yourString = JS.getAppUserId();
    let entrance = JS.getAppEntrance();
    alert("用户ID："+yourString);
    if(yourString && entrance){
      // alert(entrance)
      localStorage.setItem('user',yourString);
      let result=entrance.split(",");
      for(let i=0;i<result.length;i++){
        if(i===0){
          // alert("获取入口："+result[i]);
          localStorage.setItem('entrance',result[i]);
        }else if(i === 1){
          // alert("用户手机类型："+result[i]);
          localStorage.setItem('platform',result[i]);
        }
      }
    }else {
        alert('获取用户id失败，请重新进入');
        JS.closeWebView();
        return false;
    }
    /**
     * 分割字符串
     */
    // if(yourString){
    //   let result=yourString.split(",");
    //   for(let i=0;i<result.length;i++){
    //     console.log(result[i]);
    //     if(i === 0 ){
    //       alert("用户ID："+result[i]);
    //       localStorage.setItem('user',result[i]);
    //     }else if(i===1){
    //       alert("获取入口："+result[i]);
    //       localStorage.setItem('entrance',result[i]);
    //     }else if(i === 2){
    //       alert("用户手机类型："+result[i]);
    //       localStorage.setItem('platform',result[i]);
    //     }
    //   }
    // }else {
    //   alert('获取用户id失败，请重新进入');
    //   JS.closeWebView();
    // }
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
