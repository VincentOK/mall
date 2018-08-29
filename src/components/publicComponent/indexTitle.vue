<template>
  <div>
    <div class="shop_title">
      <img class="close_shop" v-on:click="closeWeb" src="/static/img/pay_close.png" alt="">
      时间商城
    </div>
  </div>
</template>

<script>
  export default {
    name: "indexTitle",
    data(){
      return{
      }
    },
    methods:{
      closeWeb:function () {
        console.log("环境："+process.env.NODE_ENV)
        if(process.env.NODE_ENV == 'production'){
          JS.closeWebView();
        }
      },
    }
  }
</script>

<style scoped>
  .close_shop{
    position: absolute;
    height: 12px;
    left: 10px;
    top: 14px;
  }
  .shop_title{
    position: fixed;
    height: 40px;
    line-height: 40px;
    text-align: left;
    width: 100%;
    margin: auto;
    padding-left: 30px;
    z-index: 9999999;
    /*color: black;*/
    background-color: white;
    /*opacity: 0.5;*/
    padding-bottom: 40px;
    font-size: 16px;
    color: black;
  }
</style>
