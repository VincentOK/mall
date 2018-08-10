// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import directives from './commonJS/directives'
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
Vue.use(VueAwesomeSwiper)
directives(Vue)

Vue.config.productionTip = false
Vue.prototype.touchRight = function(){
  console.log("8888888")
  window.history.back()
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
