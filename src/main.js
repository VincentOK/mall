// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import   _protypeJs   from './config/_prototypeJs'
import Loading from './components/publicComponent/loading/loading'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
Vue.use(VueAwesomeSwiper)
Vue.use(_protypeJs)
Vue.use(Loading)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
