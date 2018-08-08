<!--主页列表-->
<template>
  <div class="hello">
    <div class="header">
        <span class="my_order">
          <router-link class="top_order" :to="'/myorder'">
            我的订单
            <img class="index_img" src="/static/img/chooseSelect2.png">
          </router-link>
        </span>
        <img class="logo" src="/static/img/a1.jpg" alt="">
        <div>
          <p>我是商家用户</p>
          <p class="header_money">我的时间币:500</p>
        </div>
    </div>
    <div class="header_title">
        <div class="header_title_left">
          <router-link class="a_detail" :to="'/luckylist'">
            <div class="content_title">
              <img class="img_header" src="/static/img/lottery.png" alt="">
            </div>
            <label class="word_header" for="">抽奖活动</label>
          </router-link>
        </div>
        <div class="header_title_left">
          <router-link class="a_detail" :to="'/snapuplist'">
            <div class="content_title">
              <img class="img_header" src="/static/img/time_buy.png" alt="">
            </div>
            <label class="word_header" for="">限时抢购</label>
          </router-link>
        </div>
        <div class="header_title_right">
          <router-link class="a_detail" :to="'/cash'">
          <div class="content_title">
            <img class="img_header" src="/static/img/cash.png" alt="">
          </div>
          <label  class="word_header"  for="">现金专区</label>
          </router-link>
        </div>

        <div class="header_title_right">
          <router-link class="a_detail" :to="'/exchange'">
          <div class="content_title">
            <img class="img_header" src="/static/img/time_cash.png" alt="">
          </div>
          <label  class="word_header" for="">时间币专区</label>
          </router-link>
        </div>

    </div>
    <div class="null_div"></div>
    <div class="flashSale">
        <span class="flash_sale_char">限时抢购</span>
      <time-down-view @time-end="clearTime = true" :endTime='endTime' :endTimeChar='endTimeChar' :timeStyle='indexStyle'></time-down-view>
    </div>
    <flash-sale-view></flash-sale-view>
    <recommend-view></recommend-view>
    <!-- <exchange-view></exchange-view>
    <deduction-view></deduction-view>
    <cash-view></cash-view> -->
  </div>
</template>

<script>
import Vue from "vue";
import flashSale from "./flashSale";
import recommend from "./recommend";
import timeDown from "../publicComponent/timeDown";
Vue.component("flash-sale-view", flashSale);
Vue.component("recommend-view", recommend);
Vue.component("time-down-view", timeDown);
// import exchange from './exchange'
// import deduction from './deduction'
// import cash from './cash'
// Vue.component('exchange-view', exchange)
// Vue.component('deduction-view', deduction)
// Vue.component('cash-view', cash)
export default {
  name: "index",
  components: {
    flashSale,
    recommend,
    timeDown
    // exchange,
    // deduction,
    // cash
  },
  data() {
    return {
      endTime: "2018-08-20 09:45:30",
      endTimeChar: "距结束",
      indexStyle: "indexStyle",
      clearTime: false,
      flag: false,
      list: []
    };
  },
  mounted() {
    let time = setInterval(() => {
      if (this.flag == true) {
        clearInterval(time);
      }
      this.timeDown();
    }, 500);
  },
  methods: {
    timeDown() {
      const endTime = new Date(this.endTime);
      const nowTime = new Date();
      let leftTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000);
      if (this.clearTime) {
        console.log("endtime");
      }
      let h, m, s;
      if (leftTime <= 0) {
        this.flag = true;
        this.$emit("time-end");
        this.timeH = `00`;
        this.timeM = `00`;
        this.timeS = `00`;
      } else {
        this.timeH = this.formate(parseInt((leftTime / (60 * 60)) % 24));
        this.timeM = this.formate(parseInt((leftTime / 60) % 60));
        this.timeS = this.formate(parseInt(leftTime % 60));
      }
    },
    formate(time) {
      if (time >= 10) {
        return time;
      } else {
        return `0${time}`;
      }
    }
  },
  computed: {},
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.a_detail {
  color: black;
}
.top_order {
  color: white;
  text-decoration: none;
}
.header {
  height: 144px;
  background-image: url("/static/img/bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.my_order {
  margin: 0;
  position: absolute;
  right: 12px;
  top: 12px;
  color: white;
  font-size: 12px;
}
.index_img {
  width: 6px;
  height: 9px;
}
.header_money {
  font-size: 12px;
}
.header p {
  color: white;
  margin: 0;
  padding: 0;
  text-align: left;
  margin-left: 110px;
}
.header p:first-child {
  font-size: 24px;
  font-weight: bold;
  padding-top: 55px;
  padding-bottom: 9px;
}
.logo {
  height: 70px;
  width: 70px;
  border-radius: 50%;
  float: left;
  margin-top: 45px;
  margin-left: 30px;
}
.header_title {
  display: flex;
  height: 105px;
  margin: 0;
}
.header_title_left {
  flex: 1;
  text-align: center;
  position: relative;
}
.header_title_right {
  flex: 1;
  text-align: center;
  position: relative;
}
.word_header {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin: 22px auto;
  margin-top: 0;
}
.content_title {
  width: 49px;
  height: 49px;
  line-height: 49px;
  background-color: aquamarine;
  border-radius: 50%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 12px auto;
}
.img_header {
 width: 100%;
 height: 100%;
}
.flashSale {
  height: 49px;
  border-bottom: 1px solid #eee;
  vertical-align: middle;
}
.flashSale .flash_sale_char {
  line-height: 49px;
  float: left;
  margin-left: 12px;
  font-size: 16px;
  color: #333;
}
</style>
