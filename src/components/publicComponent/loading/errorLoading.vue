<template>
  <transition :name="animateName">
    <div class="loadings_a">
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
  .loadings__loader img{
    width: 30px;
    height: 30px;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .loadings_a{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    /*border: 1px solid red;*/
    z-index: 999999;
  }
  .loadings__loader{
    position: absolute;
    left: 0;
    right: 0;
    top: 30%;
    /*bottom: 0;*/
    width: 100px;
    height: 100px;
    margin: auto;
    background-color: black;
    opacity: 0.5;
    border-radius: 10px;
  }
</style>
