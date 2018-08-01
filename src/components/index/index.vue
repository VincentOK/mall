<!--主页列表-->
<template>
  <div class="hello">
    <div class="header">
        <span class="my_order"><router-link class="top_order" :to="'/refundlist'">我的订单<img class="index_img" src="/static/img/chooseSelect.png"></router-link></span>
        <img class="logo" src="/static/img/a1.jpg" alt="">
        <div>
          <p>我是秋秋妹</p>
          <p class="header_money">500时间币</p>
        </div>
    </div>
    <div class="header_title">
        <div class="header_title_left">
          <router-link class="a_detail" :to="'/luckylist'">
            <div class="content_title">
              <img class="img_header" src="/static/img/gift.png" alt="">
              <label class="word_header" for="">&nbsp;&nbsp;抽奖活动</label>
            </div>
          </router-link>
        </div>

            <div class="header_title_right">
              <router-link class="a_detail" :to="'/snapuplist'">
              <div class="content_title">
                <img class="img_header" src="/static/img/lucky_draw.png" alt="">
                <label  class="word_header"  for="">&nbsp;&nbsp;限时抢购</label>
              </div>
              </router-link>
            </div>

    </div>
    <div class="null_div"></div>
    <exchange-view></exchange-view>
    <deduction-view></deduction-view>
    <cash-view></cash-view>
  </div>
</template>

<script>
import Vue from 'vue'
import exchange from './exchange'
import deduction from './deduction'
import cash from './cash'
Vue.component('exchange-view', exchange)
Vue.component('deduction-view', deduction)
Vue.component('cash-view', cash)
export default {
  name: 'index',
  components: {
    exchange,
    deduction,
    cash
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      list:[],
    }
  },
  computed: {
  },
  created() {
  },
  methods:{
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .a_detail{
    color: black;
  }
  .top_order{
    color: white;
    text-decoration: none;
  }
  .header{
    /*background-color: #FD695D;*/
    height: 182px;
    background-image: url("/static/img/bg@2x.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .my_order{
    margin: 0;
    position: absolute;
    right: 12px;
    top: 12px;
    color: white;
    font-size: 12px;
  }
  .index_img{
    width: 15px;
    transform:rotate(-90deg);
    -ms-transform:rotate(-90deg); 	/* IE 9 */
    -moz-transform:rotate(-90deg); 	/* Firefox */
    -webkit-transform:rotate(-90deg); /* Safari 和 Chrome */
    -o-transform:rotate(-90deg); 	/* Opera */
  }
  .header_money{
    padding-top: 10px;
  }
  .header p{
    color: white;
    margin: 0;
    padding: 0;
    text-align: left;
    margin-left: 110px;
  }
  .header p:first-child{
    font-size: 18px;
    font-weight: bold;
    padding-top: 90px;
    padding-bottom: 10px;
  }
  .logo{
    height: 70px;
    width: 70px;
    border-radius: 50%;
    float: left;
    margin-top: 80px;
    margin-left: 30px;
  }
  .header_title{
    display: flex;
    height: 40px;
    margin: 5px 0;
  }
  .header_title_left{
    flex: 1;
    text-align: center;
    border-right: 1px solid lightgray;
    position: relative;
    height: 40px;
  }
  .header_title_right{
    flex: 1;
    text-align: center;
    position: relative;
    height: 40px;
  }
  .word_header{
    float: left;
  }
  .content_title{
    width: 110px;
    height: 40px;
    line-height: 40px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
  }
  .img_header{
    display: block;
    text-align: center;
    margin: auto;
    float: left;
    height: 25px;
    margin-top: 7.5px;
  }
</style>
