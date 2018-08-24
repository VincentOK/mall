<template>
  <transition :name="animateName">
    <div class="loadings" v-show="isShow">
      <div class="loadings__loader">
        <img   src="/static/img/prompt.png" alt="">
        <div id="loadingerror"></div>
      </div>
    </div>
  </transition>
</template>
<script type="text/babel">
  export default {
    data() {
      return {
        isShow: true,
        hasAnimate: true,
      }
    },
    computed: {
      /**
       * 动画效果样式，没有返回空
       * @return {String} 样式
       */
      animateName() {
        return this.hasAnimate ? 'opacity' : ''
      },
    },
    methods: {

    },
  }
</script>

<style  scope>
  #loadingerror{
    color: white;
    width: 90%;
    margin: auto;
  }
  .loadings{
    position: absolute;
    top: 250px;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
    z-index: 999999999;
  }
  .loadings__loader{
    width: 100px;
    height: 100px;
    margin: auto;
    background-color: black;
    opacity: 0.5;
    border-radius: 10px;
  }
  .loadings__loader img{
    width: 30px;
    height: 30px;
    margin-top: 20px;
    margin-bottom: 10px;
  }
</style>
