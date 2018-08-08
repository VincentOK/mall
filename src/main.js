// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
// import touch from 'vue-directive-touch';
import 'swiper/dist/css/swiper.css'
import directives from './commonJS/directives'
Vue.use(VueAwesomeSwiper)
// Vue.use(touch);
directives(Vue)
Vue.config.productionTip = false
Vue.prototype.$setgoindex = function () {
  console.log(window.history.length)
  if (window.history.length <= 1) {
    if (location.href.indexOf('?') === -1) {
      window.location.href = location.href + '?goindex=true'
    } else if (location.href.indexOf('?') !== -1 && location.href.indexOf('goindex') === -1) {
      window.location.href = location.href + '&goindex=true'
    }
  }
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
