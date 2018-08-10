<!--提交领奖信息-->
<template>
    <div  v-touch:swiperight="touchRight">
      <div class="all_snap">
        <div class="snap_list">
          <div class="snap_one">
            <div class="snap_one_left">
              <img src="/static/img/a1.jpg" alt="">
            </div>
            <div class="snap_one_right">
              <p class="snap_right_title">越南美女限时抢购越南美女限时抢购越南美女限时抢购</p>
              <p class="snap_title_pay">
                规格：1瓶
              </p>
              <p class="snap_title_on">
                 x1
              </p>
            </div>
          </div>
        </div>
        <div class="null_div strinp_bg"></div>
        <!-- <div class="strinp_bg"></div> -->
        <div class="adress_detail_all">
          <div class="adress_detail">
            <div class="adress_left">
              <p class="word_moren">送至</p>
            </div>
            <div class="adress_right" @click="addAdress">
              <p><label>{{addressName}}</label><label class="adress_tel">{{addressPhone}}</label><img class="right_img" src="/static/img/right.png" alt=""></p>
              <p><img class="left_img" src="/static/img/position_icon.png" alt=""><label>{{addressDetail}}</label></p>
            </div>
          </div>
          <div class="adress_detail">
            <div class="adress_left">
              <p class="word_moren">运费</p>
            </div>
            <div class="adress_right">
              <p>包邮</p>
            </div>
          </div>
        </div>
      </div>
      <dialog-view  :prizeDialog="prizeDialog"></dialog-view>
      <div class="buy_it">
        <button @click="submitPrize">提交领奖信息</button>
      </div>
    </div>
</template>

<script>
import Vue from "vue";
import mydialog from "../dialog/mydialog";
Vue.component("dialog-view", mydialog);
export default {
  name: "luckycenter",
  data() {
    return {
      addressPhone: 1548745156,
      addressName: "Vincent",
      addressDetail: "广东省深圳市南山区田厦金牛广场1402",
      prizeDialog: {
        flag: false,
        msg: ""
      }
    };
  },
  components: {
    mydialog
  },
  methods: {
    addAdress: function() {
      this.$router.push("/add/myaddress");
    },
    submitPrize: function() {
      if (this.addressPhone && this.addressName && this.addressDetail) {
        this.prizeDialog = {
          flag: true,
          msg: "领奖信息已提交 快递员将在近期为您送上奖品！"
        };
      }
    }
  }
};
</script>

<style scoped>
.buy_it {
  position: fixed;
  bottom: 40px;
  width: 95%;
  margin: auto;
}
.buy_it button {
  background-color: #ea3339;
  color: white;
  height: 45px;
  width: 90%;
  border-radius: 30px;
  border: none;
  font-size: 16px;
  outline: none;
}
.strinp_bg {
  width: 100%;
  background-image: url("/static/img/strinp.png");
  background-position: 0 1px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.snap_list {
  width: 100%;
  border-top: 1px solid #f9f9f9;
  padding-bottom: 8px;
}
.snap_one {
  display: flex;
  width: 95%;
  margin: auto;
  margin-top: 8px;
}
.snap_one_left {
  flex: 2;
}
.snap_one_left img {
  width: 110px;
  height: 110px;
}
.snap_one_right {
  flex: 4;
  font-size: 14px;
}
.snap_one_right p {
  margin: 0;
  margin-left: 13px;
  text-align: left;
}
.snap_one_right p:first-child {
  color: #333333;
  font-size: 14px;
  padding-bottom: 10px;
}
.snap_one_right p:nth-child(2) {
  padding-bottom: 10px;
}
.snap_title_on {
  padding-bottom: 0;
  margin-bottom: 0;
  color: darkgray;
}
.snap_title_pay {
  color: darkgray;
  padding-top: 20px;
  font-size: 14px;
}

.detail_detail p:first-child {
  font-size: 14px;
  font-weight: 600;
}
.right_count img {
  width: 20px;
  margin-top: 5px;
  margin-left: 5px;
}
.adress_detail_all {
  width: 95%;
  margin: auto;
}
.adress_detail {
  display: flex;
}
.adress_detail p {
  margin: 0;
  padding: 0;
}
.adress_tel {
  margin-left: 15px;
}
.word_moren {
  margin: 0;
  padding-top: 10px;
  color: #9b9b9b;
}
.adress_detail p:first-child {
  padding: 10px 0;
}
.right_img {
  float: right;
  width: 15px;
}
.left_img{
  width: 11px;
  margin-right: 5px;
}
.adress_left {
  flex: 1;
}
.adress_right {
  flex: 9;
  text-align: left;
  padding-left: 20px;
}
</style>
