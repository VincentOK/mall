<!--抽奖列表-->
<template>
  <div>
    <img class="lucky_banner" src="/static/img/gift@2x.png" alt="">
    <div class="stamp" v-if="!clickLottery">
      <div class="apic">
        <button @click="clickToTheLottery">开始刮奖</button><br><br>
        <label v-show="whetherFree">今日免费<span class="free-times">3</span>次</label>
        <label v-show="!whetherFree"><span class="lucky_money">0.5</span>时间币/每次</label>
      </div>
    </div>
    <div id="canvas" v-if="clickLottery">
      <div class="apicCanvas">
          <canvas id="mask"></canvas>
      </div>
    </div>
    <div>
      <p class="lucky_title">奖品说明</p>
      <div class="lucky_all_list">
        <div class="lucky_one">
          <div class="lucky_one_left">
            <img src="/static/img/a1.jpg" alt="">
          </div>
          <div class="lucky_one_right">
            <p>夏季水培植物留香薄荷柠檬盆栽驱蚊草玻璃盆景</p>
            <p>
              <label>规格：</label>
              <label>1瓶</label>
            </p>
            <p><label class="lucky_num">x1</label></p>
          </div>
        </div>
        <div class="lucky_one">
          <div class="lucky_one_left">
            <img src="/static/img/a1.jpg" alt="">
          </div>
          <div class="lucky_one_right">
            <p>夏季水培植物留香薄荷柠檬盆栽驱蚊草玻璃盆景</p>
            <p>
              <label>规格：</label>
              <label>1瓶</label>
            </p>
            <p><label class="lucky_num">x1</label></p>
          </div>
        </div>
        <div class="lucky_one">
          <div class="lucky_one_left">
            <img src="/static/img/a1.jpg" alt="">
          </div>
          <div class="lucky_one_right">
            <p>夏季水培植物留香薄荷柠檬盆栽驱蚊草玻璃盆景</p>
            <p>
              <label>规格：</label>
              <label>1瓶</label>
            </p>
            <p><label class="lucky_num">x1</label></p>
          </div>
        </div>
        <div class="lucky_one">
          <div class="lucky_one_left">
            <img src="/static/img/a1.jpg" alt="">
          </div>
          <div class="lucky_one_right">
            <p>夏季水培植物留香薄荷柠檬盆栽驱蚊草玻璃盆景</p>
            <p>
              <label>规格：</label>
              <label>1瓶</label>
            </p>
            <p><label class="lucky_num">x1</label></p>
          </div>
        </div>
      </div>
    </div>
    <div class="activity-description">
      <div class="description-section">
        <p>活动说明</p>
        <div class="activity-introduction">
          <p>欢乐暑假档，奖品送不停</p>
          <p>活动说明：此活动为概率中奖，奖品数量有限，祝好运!</p>
          <P>活动时间：即日起至2018-7-15</P>
        </div>
        <ul>
          <li>惊喜一：盆栽植物一套 （6瓶）</li>
          <li>惊喜二：创意3D雨伞无痕挂钩 （4个）</li>
          <li>惊喜三：创意水果叉 （一盒）</li>
          <li>惊喜四：光控小夜灯 （一个）</li>
        </ul>
        <div class="accept-prize">
          <p>1、实物类奖品将在活动结束后5-10个工作日安排发货，请耐心等待</p>
          <p>2、优惠卷类奖品的使用规则详见每个优惠卷的介绍页</p>
          <span class="dashed-left"></span>
          <span class="dashed-right"></span>
        </div>
      </div>
    </div>
    <winning-view v-show="winThePrice === 'win'" v-on:toDraw="toDrawwing"></winning-view>
    <notwinning-view v-show="winThePrice === 'notWin'" v-on:toDraw="toDrawwing"></notwinning-view>
  </div>
</template>

<script>
import Vue from "vue";
import notwinning from "./notwinning";
import winning from "./winning";
Vue.component("notwinning-view", notwinning);
Vue.component("winning-view", winning);
export default {
  name: "luckylist",
  data() {
    return {
      whetherFree: false,
      clickLottery: false,
      winThePrice: "",
      canvas: HTMLCanvasElement,
    };
  },
  comments: {
    notwinning,
    winning
  },
  updated() {
    this.$nextTick(function() {
      let canvas = document.getElementById("mask");
      if(canvas!=null){
        this.loadCanvas();
      }
    });
  },
  // watch:{
  //   clickLottery:function(){
  //     this.loadCanvas();
  //   }
  // },
  methods: {
    clickToTheLottery() {
      this.clickLottery = true;
    },
    toDrawwing(rawData) {
      this.winThePrice = 'rawData';
      this.clickLottery = rawData;
    },
    loadCanvas() {
      let self = this;
      var canvas = document.getElementById("mask");
      var context = canvas.getContext("2d");
      context.fillStyle = "#d1d1d1";
      context.fillRect(0, 0, 358, 150);
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
        self.winThePrice = "notWin";
      }
    }
  }
};
</script>

<style scoped>
.lucky_title {
  font-size: 16px;
  font-weight: 600;
}
.lucky_all_list {
  width: 90%;
  margin: auto;
}
.lucky_one {
  display: flex;
  /*border: 1px solid darkgray;*/
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px lightgray;
  margin-top: 13px;
}
.lucky_one_left {
  flex: 1;
}
.lucky_one_left img {
  width: 110px;
}
.lucky_one_right {
  flex: 3;
  text-align: left;
}
.lucky_one_right p {
  margin: 0;
}
.lucky_one_right p:first-child {
  padding: 5px 0 10px 10px;
}
.lucky_one_right p:nth-child(2) {
  padding: 10px 0 0 10px;
  color: #b9b9b9;
}
.lucky_one_right p:last-child {
  color: #b9b9b9;
  padding: 5px 0 0px 10px;
}
.lucky_banner {
  width: 100%;
}
#mask {
  width: 100%;
  height: 100%;
}
#canvas {
  width: 95%;
  height: 159px;
  display: inline-block;
  background: white;
  background: radial-gradient(
    transparent 0px,
    transparent 5px,
    #d1d1d1 5px,
    #d1d1d1
  );
  background-size: 20px 20px;
  background-position: 0 -10px;
  margin-top: 10px;
  margin-bottom: 2.5px;
}
/* #canvas:after {
  content: "";
  position: absolute;
  left: 5px;
  top: 5px;
  right: 5px;
  bottom: 5px;
  box-shadow: 0 0 20px 1px rgba(255, 255, 255, 0.5);
  z-index: -1;
} */
.apicCanvas {
  width: 100%;
  height: 149px;
  margin-top: 5px;
  background: #ffcf64;
}
.stamp {
  width: 90%;
  height: 139px;
  display: inline-block;
  padding: 10px;
  background: white;
  position: relative;
  background: radial-gradient(
    transparent 0px,
    transparent 5px,
    #ffcf64 5px,
    #ffcf64
  );
  background-size: 20px 20px;
  background-position: 0 -10px;
  margin-top: 10px;
}
.stamp:after {
  content: "";
  position: absolute;
  left: 5px;
  top: 5px;
  right: 5px;
  bottom: 5px;
  box-shadow: 0 0 20px 1px rgba(255, 255, 255, 0.5);
  z-index: -1;
}
.apic {
  width: 99%;
  height: 87%;
  background: #ffcf64;
  position: absolute;
  margin-left: -2%;
}
.apic > button {
  width: 130px;
  height: 40px;
  margin-top: 40px;
  background: #ec414d;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  color: white;
  box-shadow: 0 3px 0 #a51414cf;
}
.lucky_money {
  color: #ec414d;
}
.free-times {
  color: #ec414d;
}
.activity-description {
  width: 100%;
  height: 550px;
  display: inline-block;
  position: relative;
  margin-top: 80px;
  background: #ec414d;
  background: radial-gradient(
    transparent 0px,
    transparent 6px,
    #ec414d 5px,
    #ec414d
  );
  background-size: 20px 28px;
  background-position: 0 -10px;
}
.activity-description:after {
  content: "";
  position: absolute;
  top: 5px;
  z-index: -1;
}
.description-section {
  width: 100%;
  height: 98%;
  background: #ec414d;
  position: absolute;
  top: 3%;
}
.description-section p {
  font-size: 16px;
  color: aliceblue;
  margin: 46px 0 0 0;
}
.description-section ul {
  list-style: none;
  text-align: left;
  margin-top: 52px;
}
.description-section ul li {
  color: aliceblue;
  letter-spacing: 1px;
  font-size: 14px;
}
.activity-introduction {
  text-align: left;
  margin: 0 38px;
  margin-top: 26px;
}
.activity-introduction p {
  margin: 0;
  padding: 0;
  letter-spacing: 1px;
  font-size: 14px;
}
.accept-prize {
  margin: 50px 38px 0 38px;
  text-align: left;
  letter-spacing: 1px;
  font-size: 14px;
  height: 130px;
}
.accept-prize p {
  letter-spacing: 1px;
  font-size: 14px;
  margin: 10px 0;
  line-height: 25px;
}
.accept-prize span {
  display: inline-block;
  width: 130px;
  padding-top: 20px;
  border-bottom: 1px dashed white;
}
.dashed-left {
  float: left;
}
.dashed-right {
  float: right;
}
</style>
