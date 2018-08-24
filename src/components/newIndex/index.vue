<!--主页列表-->
<template>
  <div class="hello">
    <img src="/static/img/lucky_ground.png" id="canvasImg" style="display: none;">
    <indexTitle-view></indexTitle-view>
    <scroller class="conent_all_h5" :on-infinite="infinite" :on-refresh="refresh" ref="indexScroller">
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
      <time-down-view @time-end="clearTime" :endTime='endTime' :endTimeChar='endTimeChar' :timeStyle='indexStyle'></time-down-view>
    </div>
    <flash-sale-view></flash-sale-view>
    <recommend-view :commodityList='commodity_list' :commodityTimeList='commodity_time_list' :commodityCount='commodity_count_list'></recommend-view>
      <!--<loading-view></loading-view>-->
    </scroller>
  </div>
</template>

<script>
import Vue from "vue";
import { getList } from "../../config/request";
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
      noData: "",
      endTime: "2018-08-30 17:57:45",
      endTimeChar: "距结束",
      indexStyle: "indexStyle",
      flag: false,
      list: [],
      commodity_list: [],
      commodity_time_list: [],
      commodity_count_list: [],
      commodity_count: 1
    };
  },
  mounted() {
    this.getCommodityData();
    //  this.commodity_list = [
    //   {
    //     id: "1",
    //     img_url: "/static/img/a1.jpg",
    //     name:
    //       "海南贵妃特价海南贵妃特价海南贵南贵妃特价海南贵妃妃南贵妃海南贵妃特价海南贵妃特价海南贵南贵妃特价海南贵妃妃南贵妃海南贵妃特价海南贵妃特价海南贵南贵妃特价海南贵妃妃南贵妃 送货上门",
    //     price: "120",
    //     time_money: "356.58",
    //     original_cost: "345",
    //     goods_tag: "1",
    //     count: "121"
    //   },
    //   {
    //     id: "2",
    //     img_url: "/static/img/a1.jpg",
    //     name: "海南贵妃特价海南贵妃 送货上门",
    //     price: "120.00",
    //     time_money: "356.58",
    //     original_cost: "345",
    //     goods_tag: "2",
    //     count: "122"
    //   },
    //   {
    //     id: "3",
    //     img_url: "/static/img/a1.jpg",
    //     name: "海南贵妃特价海南贵妃 送货上门",
    //     price: "120",
    //     time_money: "356.58",
    //     original_cost: "345",
    //     goods_tag: "3",
    //     count: "123"
    //   },
    //   {
    //     id: "4",
    //     img_url: "/static/img/a1.jpg",
    //     name: "海南贵妃特价海南贵妃 送货上门",
    //     price: "120",
    //     time_money: "356.58",
    //     original_cost: "345",
    //     goods_tag: "0",
    //     count: "124"
    //   },
    //   {
    //     id: "5",
    //     img_url: "/static/img/a1.jpg",
    //     name: "海南贵妃特价海南贵妃 送货上门",
    //     price: "120.00",
    //     time_money: "356.58",
    //     original_cost: "345",
    //     goods_tag: "3",
    //     count: "125"
    //   },
    //   {
    //     id: "6",
    //     img_url: "/static/img/a1.jpg",
    //     name: "海南贵妃特价海南贵妃 送货上门",
    //     price: "120",
    //     time_money: "356.58",
    //     original_cost: "345",
    //     goods_tag: "3",
    //     count: "125"
    //   }
    // ];
    // this.commodity_time_list = [
    //   {
    //     id: "1",
    //     img_url: "/static/img/a1.jpg",
    //     name:
    //       "海南贵妃特价海南贵妃特价海南贵南贵妃特价海南贵妃妃南贵妃海南贵妃特价海南贵妃特价海南贵南贵妃特价海南贵妃妃南贵妃海南贵妃特价海南贵妃特价海南贵南贵妃特价海南贵妃妃南贵妃 送货上门",
    //     price: "120",
    //     time_money: "356.58",
    //     count: "121",
    //     original_cost: "345"
    //   },
    //   {
    //     id: "2",
    //     img_url: "/static/img/a1.jpg",
    //     name: "海南贵妃特价海南贵妃 送货上门",
    //     price: "120",
    //     time_money: "356.58",
    //     count: "122",
    //     original_cost: "345"
    //   },
    //   {
    //     id: "3",
    //     img_url: "/static/img/a1.jpg",
    //     name: "海南贵妃特价海南贵妃 送货上门",
    //     price: "120",
    //     time_money: "356.58",
    //     original_cost: "345",
    //     count: "123"
    //   }
    // ];
  },
  methods: {
    getCommodityData() {
      let vm = this
      getList(this.commodity_count).then(res => {
        vm.commodity_count_list.push(res.data);
      }).catch( err =>{
        console.log(err);
      });
    },
    clearTime(newVal, oldVal) {
      if (newVal) {
        console.log("hello");
      }
    },
    infinite(done) {
      if (this.noData) {
        setTimeout(() => {
          this.$refs.indexScroller.finishInfinite(2);
        });
        return;
      }
      let self = this;
      let start =
        (self.commodity_list.length + self.commodity_time_list.length) *
        self.commodity_count;
      setTimeout(() => {
        self.commodity_count++;
        self.getCommodityData();
        if (self.commodity_count > 3) {
          self.noData = "没有更多数据";
        };
         
        self.$refs.indexScroller.resize();
        done();
      }, 1500);
    },
    refresh(done) {
      console.log(123);
      setTimeout(() => {
        done();
      }, 1500);
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
