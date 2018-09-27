<!--抽奖列表-->
<template>
  <div>
    <shoptitle :childTitleword="childTitleword"></shoptitle>
  <div class="conent_all_h5" v-touch:swiperight="_protypeJs.touchRight">
    <img id="scream" src="/static/img/lucky_ground.png">
    <img class="lucky_banner" src="/static/img/banner@2x.png" alt="">
    <img src="/static/img/lucky_ground.png" id="canvasImg" style="display: none;">
    <div class="stamp" v-if="!clickLottery">
      <div class="apic">
        <button @click="clickToTheLottery">开始刮奖</button><br><br>
        <label v-show="!whetherFree">今日免费<span class="free-times">{{whetherFreeCount}}</span>次</label>
        <label v-show="whetherFree"><span class="lucky_money">0.5</span>时间币/次</label>
      </div>
    </div>
    <div id="canvas" v-if="clickLottery">
      <div class="apicCanvas" :style="styleBackground">
          <canvas id="mask"></canvas>
      </div>
    </div>
    <div class="win_name">
      <swiper :options="luckySwiperOption" class="swiper-no-swiping">
        <swiper-slide  v-for="(item,index) in win_list" :key="index">
        <p class="win_name_p">恭喜<span class="win_name_span">{{item.nickName}}</span>抽中了<span class="win_name_lastspan">{{_protypeJs.maxSlice10(item.prizeName) + item.prizeUnit}}</span></p>
      </swiper-slide>
      </swiper>
    </div>
    <div>
      <p class="lucky_title">奖品说明</p>
      <div class="lucky_all_list" v-for="(item,index) in prizeList" :key="index">
        <!-- <router-link class="top_order" :to="'/detail/' + item.id"> -->
          <div class="lucky_one">
            <div class="lucky_one_left">
              <img :src="item.prizeImgUrl" alt="">
            </div>
            <div class="lucky_one_right">
              <p>{{item.prizeName}}</p>
              <p>
                <label>规格：</label>
                <label>{{item.prizeUnit}}</label>
              </p>
            </div>
          </div>
        <!-- </router-link> -->
      </div>
    </div>
    <div class="activity-description" v-show="!clickLottery">
      <div class="description-section">
        <p>活动说明</p>
        <div class="activity-introduction">
          <p>{{luckyName}}</p>
          <div class="active-explain">
            <div>活动说明:</div>
            <div>{{luckyExplain}}</div>
          </div>
          <P>活动时间：{{luckyStartTime}}至{{luckyEndTime}}</P>
        </div>
        <ul>
          <li  v-for="(item,index) in prizeList" :key="index">
            <div class="active_title">惊喜{{formatTags(index)}}:</div>
            <div>{{item.prizeName}}&nbsp;({{item.prizeUnit}})</div></li>
        </ul>
        <div class="accept-prize">
          <p>1、实物类奖品将在活动结束后5-10个工作日安排发货，请耐心等待</p>
          <p>2、优惠卷类奖品的使用规则详见每个优惠卷的介绍页</p>
          <span class="dashed-left"></span>
          <p class="call_address">客服邮箱：hellotime@nihaoshijian.com</p>
        </div>
      </div>
    </div>
    <winning-view v-show="winThePrice === 'yes'" v-on:toDraw="toDrawwing" :isShowPopup="!!winThePrice" :winPrizeList="winPrizeList"></winning-view>
    <notwinning-view v-show="winThePrice === 'no'" v-on:toDraw="toDrawwing" :isShowPopup="!!winThePrice"></notwinning-view>
  </div>
  </div>
</template>

<script>
import Vue from "vue";
import notwinning from "./notwinning";
import winning from "./winning";
import {
  getLuckyList,
  getlucky,
  getcountUserLuckyNumber,
  getSelectNotice
} from "../../config/request";
Vue.component("notwinning-view", notwinning);
Vue.component("winning-view", winning);
export default {
  name: "luckylist",
  data() {
    return {
      uId: "",
      luckyId: "chou01",
      luckyBannerImgUrl: "",
      luckyEndTime: "",
      luckyExplain: "",
      luckyName: "",
      luckyStartTime: "",
      prizeList: [],
      childTitleword: "抽奖",
      whetherFree: false,
      whetherFreeCount: null,
      expend: 50,
      clickLottery: false,
      winThePrice: "",
      stateLottery: "",
      whetherPrice: false,
      winPrizeList: {},
      lucky_list: [],
      win_list: [],
      win_name: "杨天宝",
      win_gift: "芭比娃娃X1",
      luckySwiperOption: {
        autoplay: {
          delay: 2000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        direction: "vertical",
        grabCursor: true,
        autoplayDisableOnInteraction: false,
        mousewheelControl: true,
        autoHeight: true,
        speed: 2000
      }
    };
  },
  comments: {
    notwinning,
    winning
  },
  mounted() {
    this.uId = this._protypeJs.getUserId();
    this.getLuckyNumberCount();
    debugger;
    getLuckyList(this.luckyId)
      .then(res => {
        this.luckyBannerImgUrl = res.luckyBannerImgUrl;
        this.luckyStartTime = res.luckyStartTime;
        this.luckyEndTime = res.luckyEndTime;
        this.luckyExplain = res.luckyExplain;
        this.luckyName = res.luckyName;
        this.prizeList = res.prizeList;
        console.log(this.prizeList);
      })
      .catch(err => {
        console.log(err);
      });
    getSelectNotice(this.luckyId)
      .then(res => {
        this.win_list = res;
        console.log(this.win_list);
      })
      .catch(err => {
        console.log(err);
      });
  },
  updated() {
    this.$nextTick(function() {
      let canvas = document.getElementById("mask");
      if (canvas != null) {
        this.loadCanvas();
      }
    });
  },
  computed: {
    styleBackground: function() {
      if (this.whetherPrice) {
        return { backgroundImage: 'url("./static/img/win.png")' };
      } else {
        return { backgroundImage: 'url("./static/img/notwin.png")' };
      }
    }
  },
  methods: {
    formatTags(index) {
      switch (String(index)) {
        case "0":
          return "一";
        case "1":
          return "二";
        case "2":
          return "三";
        case "3":
          return "四";
        case "4":
          return "五";
        default:
          return "*";
      }
    },
    getLuckyNumberCount() {
      let self = this;
      getcountUserLuckyNumber(self.uId)
        .then(res => {
          this.whetherFreeCount = res;
          if (!Boolean(res)) {
            self.whetherFree = true;
          }
          console.log(self.whetherFreeCount);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getLuckyInfo() {
      let self = this;
      let param = {
        uid: this.uId,
        luckyId: this.luckyId,
        expend:0
      };
      if (this.whetherFreeCount <= 0) {
        param.expend = this.expend;
      }
      getlucky(param)
        .then(res => {
          self.stateLottery = res.value;
          if (
            self.stateLottery != "cant" &&
            (self.whetherFreeCount > 0 || self.expend)
          ) {
            self.clickLottery = true;
            if (self.whetherFreeCount == 0) {
              self.whetherFree = true;
            }
            self.whetherPrice = false;
            if (self.stateLottery == "yes") {
              self.winPrizeList = res;
              self.whetherPrice = true;
              console.log(self.winPrizeList);
            }
          } else {
            self.whetherFree = true;
          }
          console.log(self.stateLottery);
        })
        .catch(err => {
          console.log(err);
        });
    },
    clickToTheLottery() {
      this.getLuckyInfo();
    },
    toDrawwing(rawData) {
      this.winThePrice = "";
      this.whetherFreeCount = rawData;
      if (this.whetherFreeCount == 0) {
        this.whetherFree = true;
      }
      this.clickLottery = false;
    },
    loadCanvas() {
      let self = this;
      var canvas = document.getElementById("mask");
      var context = canvas.getContext("2d");
      var img = document.getElementById("canvasImg");
      context.drawImage(img, 0, 0, 300, 150);
      context.font = "24px Arial";
      context.textAlign = "center";
      context.fillStyle = "#fffefe";
      context.fillText("使劲刮我", 120, 83);
      context.globalCompositeOperation = "destination-out";
      canvas.addEventListener("mousedown", drawArcMouseHandle);
      canvas.addEventListener("mouseup", function(event) {
        this.removeEventListener("mouseover", mousemoveHandle);
      });
      function drawArcMouseHandle(event) {
        event.preventDefault();
        event.target.addEventListener("mousemove", mousemoveHandle);
      }
      function mousemoveHandle(event) {
        event.preventDefault();
        drawArcByPoint(event.pageX, event.pageY);
      }
      canvas.addEventListener("touchmove", drawArcTouchHandle);
      function drawArcTouchHandle(event) {
        event.preventDefault();
        var touch = event.touches[0];
        drawArcByPoint(touch.pageX, touch.pageY);
      }
      function drawArcByPoint(x, y) {
        context.beginPath();
        context.arc(
          x - canvas.offsetLeft,
          y - canvas.offsetTop,
          20,
          0,
          Math.PI * 2
        );
        context.closePath();
        context.fillStyle = "#ddd";
        context.fill();
        checkComplete();
      }
      function checkComplete() {
        var imgData = context.getImageData(0, 0, 240, 65);
        var pxData = imgData.data;
        var len = pxData.length;
        var count = 0;
        for (var i = 0; i < len; i += 4) {
          var alpha = pxData[i + 3];
          if (alpha < 10) {
            count++;
          }
        }
        var percent = count / (len / 4);
        if (percent >= 0.5) {
          showResult();
        }
      }
      function showResult(msg) {
        self.winThePrice = self.stateLottery;
      }
    }
  }
};
</script>

<style scoped>
.swiper-container-autoheight {
  height: 100%;
}
.top_order {
  text-decoration: none;
  color: #333;
}
.fixed_mask {
  height: 100%;
  overflow: hidden;
}
.lucky_title {
  margin-top: 15px;
  font-size: 16px;
  font-weight: 600;
}
.lucky_all_list {
  width: 90%;
  margin: auto;
}
.lucky_one {
  display: flex;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px lightgray;
  margin-top: 13px;
}
.lucky_one_left img {
  width: 100px;
  height: 100px;
}
.lucky_one_right {
  display: flex;
  text-align: left;
  flex-direction: column;
  justify-content: space-between;
}
.lucky_one_right p {
  margin: 0 5px;
}
.lucky_one_right p:nth-child(2) {
  margin-bottom: 5px;
  color: #b9b9b9;
}
.lucky_banner {
  width: 100%;
}
#mask {
  width: 100%;
  height: 100%;
}
#scream {
  width: 94%;
  height: 150px;
  display: none;
}
#canvas {
  width: 96%;
  height: 163px;
  margin-top: 10px;
  display: inline-block;
  background: white;
  background-image: url("/static/img/win_background.png");
  background-repeat: no-repeat;
  background-size: 100% 99%;
  background-position-y: 2px;
}
.apicCanvas {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 35%;
}
.stamp {
  width: 96%;
  height: 156px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  display: inline-block;
  background: white;
  position: relative;
  background-image: url("/static/img/lucky_start.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.win_name {
  height: 32px;
  width: 80%;
  margin: auto;
  background-image: url("/static/img/win_name.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.win_name_p {
  margin: auto;
  margin-left: 45px;
  padding-top: 1px;
  height: 100%;
  width: 90%;
  line-height: 32px;
  font-size: 11px;
  color: #333;
  text-align: left;
}
.win_name_span {
  margin: 3px;
}
.win_name_lastspan {
  font-size: 12px;
  color: #f10215;
  font-weight: bold;
}
.apic > button {
  width: 130px;
  height: 45px;
  margin-top: 38px;
  background: rgba(0, 0, 0, 0);
  border: none;
  font-size: 18px;
  color: white;
}
.lucky_money {
  color: #ec414d;
}
.free-times {
  color: #ec414d;
}
.activity-description {
  width: 100%;
  display: inline-block;
  position: relative;
  margin-top: 20px;
  background-image: url("/static/img/active_back.png");
  background-size: 100% 100%;
  background-position: 0 0;
  background-repeat: no-repeat;
}
.description-section p {
  font-size: 16px;
  color: aliceblue;
  margin: 40px 0 20px 0;
}
.description-section ul {
  list-style: none;
  text-align: left;
  margin-top: 20px;
  padding-left: 20px;
}
.description-section ul li {
  width: 95%;
  color: aliceblue;
  letter-spacing: 1px;
  font-size: 13px;
  padding: 1px 0;
}
.description-section ul li .active_title {
  float: left;
  width: 55px;
}
.description-section ul li div:last-child {
  margin-left: 55px;
}
.activity-introduction {
  text-align: left;
  width: 90%;
  margin: auto;
}
.active-explain div:first-child {
  color: aliceblue;
  float: left;
  width: 60px;
}
.active-explain div:last-child {
  color: aliceblue;
  letter-spacing: 1px;
  margin-left: 60px;
}
.activity-introduction p:first-child {
  font-size: 13px;
}
.activity-introduction p {
  margin: 0;
  padding: 2px 0;
  letter-spacing: 1px;
  font-size: 12px;
}
.accept-prize {
  margin: 30px 0 0 20px;
  text-align: left;
  font-size: 13px;
}
.accept-prize p {
  letter-spacing: 1px;
  font-size: 13px;
  margin: 5px 0;
  line-height: 20px;
  padding: 2px 0;
}
.dashed-left {
  display: block;
  width: 94%;
  padding-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px dashed white;
}
.call_address {
  width: 94%;
  text-align: center;
}
</style>
