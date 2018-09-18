<!--主页列表-->
<template>
  <div class="hello">
    <img src="/static/img/lucky_ground.png" id="canvasImg" style="display: none;">
    <indexTitle-view></indexTitle-view>
    <scroller :on-infinite="infinite" ref="indexScroller"  :height="_protypeJs.getScrollerHeight(40)" style="top: 40px">
    <div class="header">
        <span class="my_order">
          <router-link class="top_order" :to="'/myorder'">
            我的订单
            <img class="index_img" src="/static/img/chooseSelect2.png">
          </router-link>
        </span>
        <img class="logo" :src="headImgPath">
        <div>
          <p>{{nickName}}</p>
          <p class="header_money">我的时间币:{{availableCoin}}</p>
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
          <label class="word_header"  for="">现金专区</label>
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
        <span class="flash_char" v-show="targetStatus == 'ending'">{{endTimeChar}}</span>
      <div v-show="targetStatus != 'ending'">
        <time-down-view v-on:timeEnd="clearTime" :endTime='endTime' :startTime='startTime' :endTimeChar='endTimeChar' :noNextData='noNextData' :timeStyle='indexStyle' ></time-down-view>
      </div>
    </div>
    <flash-sale-view @timeStart="timeStart" @timeEnd="timeEnd" @noDataNext="noDataNext" :targetStatus='targetStatus'></flash-sale-view>
    <recommend-view :commodityList='commodity_list' :commodityTimeList='commodity_time_list' :commodityCount='commodity_count_list'></recommend-view>
      <!--<loading-view></loading-view>-->
    </scroller>
  </div>
</template>

<script>
import Vue from "vue";
import { getIndexList, getUserInfo } from "../../config/request";
import flashSale from "./flashSale";
import recommend from "./recommend";
import timeDown from "../publicComponent/timeDown";
import indexTitle from "../publicComponent/indexTitle";
Vue.component("flash-sale-view", flashSale);
Vue.component("recommend-view", recommend);
Vue.component("time-down-view", timeDown);
Vue.component("indexTitle-view", indexTitle);
export default {
  name: "index",
  components: {
    flashSale,
    recommend,
    timeDown,
    indexTitle
  },
  data() {
    return {
      headImgPath: "",
      nickName: "",
      availableCoin: null,
      noData: "",
      endTime: "",
      startTime: "",
      noNextData: false,
      targetStatus: "",
      endTimeChar: "",
      indexStyle: "",
      flag: false,
      list: [],
      commodity_list: [],
      commodity_time_list: [],
      commodity_count_list: [],
      commodity_count: 0,
      uid: ""
    };
  },
  mounted() {
    let self = this;
    self.uid = self._protypeJs.getUserId();
    getUserInfo(self.uid)
      .then(res => {
        self.headImgPath = res.headImgPath;
        self.nickName = res.nickName;
        self.availableCoin = res.availableCoin/100;
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    timeStart: function(value) {
      this.startTime = value;
    },
    timeEnd: function(value) {
      this.endTime = value;
    },
    clearTime: function(value) {
      this.targetStatus = value;
      console.log(this.targetStatus);
      if (this.targetStatus == "pendding") {
        this.endTimeChar = "距结束";
        this.indexStyle = "indexStyle";
      } else if (this.targetStatus == "ending") {
        this.endTimeChar = "本轮抢购已结束，请等待下轮抢购开启";
      } else {
        this.endTimeChar = "距下轮开始";
        this.indexStyle = "indexStyleBlack";
      }
    },
    noDataNext: function(value) {
      this.noNextData = value;
    },
    infinite(done) {
      let self = this;
      if (self.noData) {
        setTimeout(() => {
          self.$refs.indexScroller.finishInfinite(2);
        });
        return;
      }
      setTimeout(() => {
        self.commodity_count++;
        getIndexList(self.commodity_count)
          .then(res => {
            if (res && res.listRMB) {
              self.commodity_count_list.push(res);
              console.log(self.commodity_count_list);
            } else {
              self.noData = "没有更多数据";
            }
            self.$refs.indexScroller.resize();
            done();
          })
          .catch(err => {
            console.log(err);
          });
      }, 1000);
    }
  },
  computed: {},
  created() {}
};
</script>

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
  font-size: 11px;
  color: #333;
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
  border-bottom: 0.8px solid #eee;
  vertical-align: middle;
}
.flashSale .flash_sale_char {
  line-height: 49px;
  float: left;
  margin-left: 12px;
  font-size: 16px;
  color: #333;
}
.flashSale .flash_char {
  line-height: 49px;
  float: right;
  font-size: 12px;
  margin-right: 12px;
  color: #333;
}
</style>
