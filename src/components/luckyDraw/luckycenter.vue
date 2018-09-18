<!--提交领奖信息-->
<template>
  <div>
    <shoptitle :childTitleword="childTitleword"></shoptitle>

    <div class="conent_all_h5 heightAuto"  v-touch:swiperight="_protypeJs.touchRight">
      <div class="all_snap">
        <div class="snap_list">
          <div class="snap_one">
            <div class="snap_one_left">
              <img :src="prizeInfo.prizeImgUrl" alt="">
            </div>
            <div class="snap_one_right">
              <p class="snap_right_title">{{prizeInfo.prizeName}}</p>
              <div class="snap_title_pay">
                规格：{{prizeInfo.prizeUnit}}
                <p class="snap_title_on">x1</p>
              </div>
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
              <p><label>{{addressInfo.shippingName}}</label><label class="adress_tel">{{addressInfo.shippingPhone}}</label><img class="right_img" src="/static/img/right.png" alt=""></p>
              <p><img class="left_img" src="/static/img/position_icon.png" alt=""><label>{{addressInfo.shippingAddress}}&nbsp;{{addressInfo.detailAddress}}</label></p>
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
  </div>
</template>

<script>
import Vue from "vue";
import mydialog from "../dialog/mydialog";
import { getPrizeInfo, addLuchyAddress } from "../../config/request";
Vue.component("dialog-view", mydialog);
export default {
  name: "luckycenter",
  data() {
    return {
      prizeId: "jian01",
      uid: "",
      addressInfo: {
        shippingAddress: "",
        shippingName: "",
        shippingPhone: "",
        detailAddress: ""
      },
      prizeInfo: {
        prizeImgUrl: "",
        prizeName: "",
        prizeUnit: ""
      },
      childTitleword: "领奖中心",
      prizeDialog: {
        flag: false,
        msg: ""
      }
    };
  },
  mounted() {
    this.uid = this._protypeJs.getUserId();
    getPrizeInfo(this.prizeId, this.uid)
      .then(res => {
        this.addressInfo = res.addressInfo;
        this.prizeInfo = res.prizeInfo;
      })
      .catch(ree => {
        console.log(err);
      });
  },
  components: {
    mydialog
  },
  methods: {
    addAdress: function() {
      this.$router.push("/add/myaddress");
    },
    submitPrize: function() {
      let self = this;
      if (
        this.addressInfo.shippingPhone &&
        this.addressInfo.shippingAddress &&
        this.addressInfo.shippingName &&
        this.addressInfo.detailAddress
      ) {
        this.prizeDialog = {
          flag: true,
          msg: "领奖信息已提交 快递员将在近期为您送上奖品！"
        };
        let param = {
          uid: this.uid,
          commodityPrizeId: this.prizeInfo.prizeId,
          commodityPrizeName: this.prizeInfo.prizeName,
          unit: this.prizeInfo.prizeUnit,
          commodityPrizeimgUrl: this.prizeInfo.prizeImgUrl,
          receivingName: this.addressInfo.shippingName,
          receivingPhone: this.addressInfo.shippingPhone,
          receivingAddress: this.addressInfo.shippingAddress,
          detailAddress: this.addressInfo.detailAddress
        };
        addLuchyAddress(param)
          .then(res => {
            console.log(JSON.stringify(res));
          })
          .catch(err => {
            console.log(err);
          });
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
/* .snap_one_left {
  flex: 2;
} */
.snap_one_left img {
  width: 110px;
  height: 110px;
}
.snap_one_right {
  width: 100%;
  margin:5px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 14px;
}
.snap_one_right p {
  margin: 0;
  text-align: left;
}
.snap_one_right p:first-child {
  color: #333333;
  font-size: 14px;
}
.snap_title_on {
  padding-bottom: 0;
  margin-bottom: 0;
  color: darkgray;
}
.snap_title_pay {
  color: darkgray;
  text-align: left;
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
.left_img {
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
