// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as filters from './config/filter'
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
Vue.use(shoptitle)
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
