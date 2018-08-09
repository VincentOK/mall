<!--抽奖列表-->
<template>
  <div>
    <img id="scream" src="/static/img/lucky_ground.png">
    <img class="lucky_banner" src="/static/img/banner@2x.png" alt="">
    <div class="stamp" v-if="!clickLottery">
      <div class="apic">
        <button @click="clickToTheLottery">开始刮奖</button><br><br>
        <label v-show="whetherFree">今日免费<span class="free-times">3</span>次</label>
        <label v-show="!whetherFree"><span class="lucky_money">0.5</span>时间币/每次</label>
      </div>
    </div>
    <div id="canvas" v-if="clickLottery">
      <div class="apicCanvas" :style="styleBackground">
          <canvas id="mask"></canvas>
      </div>
    </div>
    <div class="win_name">
        <p>恭喜<span>{{win_name}}</span>抽中了<span>{{win_gift}}</span></p>
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
    <div class="activity-description" v-show="!clickLottery">
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
          <p class="call_address">客服邮箱：hellotime@nihaoshijian.com</p>
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
      whetherPrice: false,
      win_name:'杨天宝',
      win_gift:'芭比娃娃X1'
    };
  },
  comments: {
    notwinning,
    winning
  },
  updated() {
    this.$nextTick(function() {
      let canvas = document.getElementById("mask");
      if (canvas != null) {
        this.loadCanvas();
      }
    });
  },
  computed:{
    styleBackground:function(){
      if(this.whetherPrice){
        return {backgroundImage:'url("./static/img/win.png")'};
      }else{
        return {backgroundImage:'url("./static/img/notwin.png")'};
      }
    }
  },
  methods: {
    clickToTheLottery() {
      this.clickLottery = true;
    },
    toDrawwing(rawData) {
      this.winThePrice = "rawData";
      this.clickLottery = rawData;
    },
    loadCanvas() {
      let self = this;
      var canvas = document.getElementById("mask");
      var context = canvas.getContext("2d");
      var img = new Image();
      img.src = '/static/img/lucky_ground.png';
      context.drawImage(img, 0, 0, 300, 150);
      context.font = '24px Arial';
      context.textAlign = 'center';
      context.fillStyle = '#fffefe';
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
        self.winThePrice = "win";
        // document.getElementById("app").setAttribute("class","fixed_mask");
        var body = document.getElementsByTagName('body')
        body[0].style.height = '700px';
        body[0].style.overflow = 'hidden';
        // document.getElementsByTagName('body').style.overflow = 'hidden';
      }
    }
  }
};
</script>

<style scoped>
.fixed_mask{
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
.apicCanvas{
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 35%;
}
.stamp {
  width: 90%;
  height: 136px;
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
.win_name{
  height: 32px;
  width: 80%;
  margin: auto;
  background-image: url("/static/img/win_name.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.win_name p {
  margin: 5px 0 0 0;
  padding-top: 1px;
  height: 100%;
  width: 90%;
  line-height: 32px;
  font-size: 11px;
  color: #333;
}
.win_name p span{
  margin: 3px;
}
.win_name p span:last-child{
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
  height: 410px;
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
  margin: 40px 0 0 0;
}
.description-section ul {
  list-style: none;
  text-align: left;
  margin-top: 30px;
  padding-left: 20px;
}
.description-section ul li {
  color: aliceblue;
  letter-spacing: 1px;
  font-size: 13px;
  padding: 1px 0;
}
.activity-introduction {
  text-align: left;
  margin-left: 20px;
  margin-top: 20px;
}
.activity-introduction p:first-child{
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
.call_address{
  width: 94%;
  text-align: center;
}
</style>
