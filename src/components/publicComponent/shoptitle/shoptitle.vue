<template>
  <div>
    <div class="shop_title">
      <img v-on:click="returnBack" class="title_return" style="width: 10px;height: 17px" src="/static/img/back@2x.png" alt="">
      <!--<img class="close_shop" v-on:click="_protypeJs.JScloseWebView()" src="/static/img/close@2x.png" alt="">-->
      <span class="close_word">关闭</span>
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
  .close_word{
    float: right;
    font-size: 12px;
    margin-right: 10px;

  }
  .title_return{
    position: absolute;
    left: 15px;
    top: 10px;
  }
  .close_shop{
    position: absolute;
    height: 15px;
    left: 40px;
    top: 14px;
    float: right;
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
