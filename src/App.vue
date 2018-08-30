<template>
  <div id="app" class="container">
    <Loading id="loading" style="display: none"></Loading>
    <errorLoading id="requestError" style="display: none"></errorLoading>
    <!--<div style="color: red;border: 1px saddlebrown;display: none;margin-top: 200px" id="requestppp">请求数据错误</div>-->
    <transition :name="transitionName">
      <!--<keep-alive>-->
        <!--<router-view class="child-view"></router-view>-->
      <!--</keep-alive>-->
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      transitionName: 'slide-left'
    }
  },
  mounted(){
  },
  computed:{
    // activated: function () {
    //   this.$setgoindex()
    // }
  },
  watch: {
    '$route' (to, from) {
      if(to.path == '/'){
        this.transitionName = 'slide-right';
      }else{
        this.transitionName = 'slide-left';
      }
    }
  },
  methods: {
  }
}
</script>

<style>
  * {
    -webkit-touch-callout:none; /*系统默认菜单被禁用*/
    -webkit-tap-highlight-color:transparent; /*取消点击链接或者JavaScript可点击元素赋给的高亮背景色*/
  }
  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    outline: none;
  }

  *:not(input,textarea) {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
  }
  body,html {
    background-color: #ffffff;
  }
  .container{
    width:100%;
    height:100%
  }
  .heightAuto{
    height: 90%;
  }
.conent_all_h5{
  margin-top: 40px;
}
  #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  font-size: 13px;
}
.null_div{
  height: 10px;
  width: 100%;
  background-color: #f4f4f4;
}
  .child-view {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transition: all .5s cubic-bezier(.55,0,.1,1);
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(30px, 0);
    transform: translate(30px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-30px, 0);
    transform: translate(-30px, 0);
  }
</style>
