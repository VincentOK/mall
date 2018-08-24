import LoadingComponent from './loading.vue'
import LoadingErrorComponent from './errorLoading.vue'

const Loading={
  install:function (Vue) {
    Vue.component('Loading',LoadingComponent)
    Vue.component('errorLoading',LoadingErrorComponent)
  }
}
export default Loading
