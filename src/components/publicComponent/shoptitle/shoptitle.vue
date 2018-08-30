<template>
  <div>
    <div class="shop_title">
      <img v-on:click="returnBack" class="title_return" src="/static/img/right.png" alt="">
      <img class="close_shop" v-on:click="_protypeJs.JScloseWebView()" src="/static/img/pay_close.png" alt="">
      {{childTitleword}}
    </div>
  </div>
</template>

<script>
    export default {
      name: "shoptitle",
      props:['childTitleword'],
      data(){
          return{

          }
      },
      methods:{
        returnBack:function () {
          this.$router.go(-1);
        },
      }
    }
</script>

<style scoped>
  .title_return{
    position: absolute;
    left: 10px;
    top: 10px;
    width: 20px;
    transform:rotate(180deg);
    -ms-transform:rotate(180deg); /* Internet Explorer */
    -moz-transform:rotate(180deg); /* Firefox */
    -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
    -o-transform:rotate(180deg); /* Opera */
  }
  .close_shop{
    position: absolute;
    height: 12px;
    left: 40px;
    top: 14px;
  }
.shop_title{
  position: fixed;
  height: 40px;
  line-height: 40px;
  text-align: center;
  width: 100%;
  margin: auto;
  z-index: 99999999999;
  /*color: black;*/
  background-color: white;
  /*opacity: 0.5;*/
  padding-bottom: 40px;
  font-size: 16px;
  color: black;
}
</style>
