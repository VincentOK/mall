<template>
<div v-if="whetherDisplay">
  <scroller  :on-infinite="infinite"  :on-refresh = "refresh" ref="myscroller" :height="_protypeJs.getScrollerHeight(80)" style="top: 80px">
    <div style="height: 1px;"></div>
  <div class="refundlist" v-for="(item,index) in refund_list" :key="index">
    <div class="null_div"></div>
      <p class="refund_time">
        <button class="_status" v-if="item.orderStatus == '0'">已删除</button>
        <button class="_status" v-if="item.orderStatus == '1'">待付款</button>
        <button class="_status" v-if="item.orderStatus == '2'">待发货</button>
        <button class="_status" v-if="item.orderStatus == '3'">已发货</button>
        <button class="_status" v-if="item.orderStatus == '4' || item.orderStatus == '5'">退款中</button>
        <button class="_status" v-if="item.orderStatus == '6'">已退款</button>
        <button class="_status" v-if="item.orderStatus == '7'">已完成</button>
        <button class="_status" v-if="item.orderStatus == '8'">退款中</button>
        <button class="_status" v-if="item.orderStatus == '9'">已关闭</button>

        <label class="_time">{{item.orderTime}}</label>
      </p>
    <div class="refundlist_content">
      <img class="refund_img" :src="item.commodityPrizeimgUrl" alt="">
      <!--<img class="refund_img" src="/static/img/a1.jpg" alt="">-->
      <p class="refund_de">{{item.commodityPrizeName}}</p>
      <p class="refund_gui">
        规格：{{item.unit}}
        <label class="num">x{{item.count}}</label>
      </p>
    </div>
    <p class="refund_reason" v-if="item.reasonrefund">{{item.reasonrefund}}</p>
    <p class="refund_reason" v-if="item.reasonfh">{{item.reasonfh}}</p>
    <p class="refund_number">
      <label class="refund_font">订单号：</label>
      <label class="color_refund">{{item.orderNumber}}</label>
    </p>
    <p class="refund_adress">
      <label class="refund_font">快递运单号：</label>
      <label class="color_refund" v-if="item.logisticsNumber">{{item.logisticsNumber}} <label v-if="item.logisticsName">({{item.logisticsName}})</label></label>
      <label class="color_refund" v-else>暂未获取运单号</label>
        <label class="refund_money">
          <label class="refund_font" v-if="item.orderStatus != '1'">实付：</label>
          <label class="refund_font" v-else>待支付：</label>
        <label class="real_money" v-if="formatGoodsCoin(item.orderPriceRmb)">￥{{(item.orderPriceRmb + item.carriage) | formatMoney}}</label>
        <label class="real_money" v-if="formatGoodsCoin(item.orderPriceSjb)"><img class="time_icon" style="height: 16px;width: 16px;" src="/static/img/icon@2x.png" alt=""> {{item.orderPriceSjb | formatMoney}} + ￥{{item.carriage  | formatMoney}}</label>
        <label class="real_money" v-if="!formatGoodsCoin(item.orderPriceRmb) && !formatGoodsCoin(item.orderPriceSjb)">￥0.0</label>
      </label>
    </p>
    <p class="refund_now" v-show="
    item.orderStatus == '2' ||
    item.orderStatus == '3' ||
    item.orderStatus == '4' ||
    item.orderStatus == '5' ||
    item.orderStatus == '8'">
      <button class="refund_btn_one" v-if="
      item.orderStatus == '2' ||
      item.orderStatus == '3'"
              @click="gotocheck(item.commodityPrizeId,item.orderNumber)">确认收货</button>
      <button class="refund_btn" v-if="
      (item.orderStatus == '2' || item.orderStatus == '3' || item.orderStatus == '4' || item.orderStatus == '5')
       &&
       ((formatGoodsCoin(item.orderPriceRmb)) || formatGoodsCoin(item.orderPriceSjb))"
              @click="gotodetail(item.commodityPrizeId,item.orderNumber)">申请退款</button>

      <button class="refund_btn_one"  v-if="
      item.orderStatus == '8'"
              @click="drawback(item.orderNumber)">退还商品</button>
      <!--<button class="refund_btn" @click="gotodetail(item.commodityId,item.orderNumber)">申请退款</button>-->
    </p>
  </div>
  </scroller>
  <refund_dialog-view :checkStatus="checkStatus" v-on:childByValue="childByValue"  v-if="checkStatus_i"></refund_dialog-view>
  <refund_address-view v-if="drawback_i"  v-on:closeDialog="closeDialogs" :tenantPhone="tenantPhone" :tenantAddress="tenantAddress" :tenantContacts="tenantContacts"></refund_address-view>
</div>
<div v-else class="noDataTmp">
      <img src="/static/img/noOrder.png" alt="">
      <p>您尚无订单记录</p>
    </div>
</template>

<script>
import Vue from "vue";
import { getOrder, getTenantRefundAddress } from "../../config/request";
import refund_dialog from "../dialog/refund_dialog";
import refund_address from "../dialog/refund_address";
Vue.component("refund_dialog-view", refund_dialog);
Vue.component("refund_address-view", refund_address);
export default {
  name: "refundlist",
  comments: {
    refund_dialog,
    refund_address
  },
  props: ["refund_status"],
  data() {
    return {
      checkStatus_i: false,
      drawback_i: false,
      refund_list: [],
      status: 1,
      count: 0,
      checkStatus: "",
      drawbackInfo: Object,
      noData: "",
      platform: "",
      tenantContacts: String,
      tenantPhone: String,
      tenantAddress: String,
      whetherDisplay:true,
    };
  },
  watch: {
    refund_status: function(newold, oldword) {
      console.log("新状态：" + newold);
      console.log("旧状态：" + oldword);
      this.status = newold + 1;
      this.count = 0;
    }
  },
  mounted() {
    let self = this;
    this.platform = this._protypeJs.getPlatform("platform");
    if(self.whetherDisplay){
    getOrder(self.status, self._protypeJs.getUserId(), 1)
      .then(res => {
        if (res && res.length != 0) {
          // self.$emit("whetherImg", true);
          this.whetherDisplay = true
        } else {
          this.whetherDisplay = false
          // self.$emit("whetherImg", false);
        }
      })
      }
  },
  methods: {
    infinite(done) {
      console.log("触发下拉加载");
      if (this.noData) {
        setTimeout(() => {
          this.$refs.myscroller.finishInfinite(2);
        });
        return;
      }
      let self = this; //this指向问题
      self.count++;

      let status = self.status;
      let uid = self._protypeJs.getUserId();
      let pageNumber = self.count;
      let pageSize = "";
      setTimeout(() => {
        console.log("页码:" + self.count);
        console.log("status:" + status);
        console.log("uid:" + uid);
        console.log("pageNumber:" + pageNumber);
        getOrder(status, uid, pageNumber)
          .then(res => {
            console.log(res);
            if (res && res.length != 0) {
              self.refund_list = self.refund_list.concat(res);
            } else {
              self.noData = "没有更多数据";
            }
            self.$refs.myscroller.resize(2);
            done();
          })
          .catch(err => {
            console.log(err);
          });
      }, 1500);
    },
    refresh(done) {
      //这是向下滑动的时候请求最新的数据
      console.log("向下滑动");
      setTimeout(() => {
        done();
      }, 1500);
      // this.offset = 0
      // this.getDate(1, done)
    },
    childByValue: function(childByValue) {
      console.log(childByValue);
      let arr = this.refund_list;
      let orderNumber = childByValue.orderNumber;
      for (let i = 0; i < arr.length; i++) {
        JSON.stringify();
        if (arr[i].orderNumber === orderNumber) {
          arr[i].orderStatus == "6";
          return;
        }
      }
      this.checkStatus_i = childByValue.status;
    },
    gotodetail: function(commodityId, orderNumber) {
      console.log(commodityId, orderNumber);
      this.$router.push("/refundindex/" + commodityId + "/" + orderNumber);
    },
    gotocheck: function(commodityId, orderNumber) {
      console.log("商品id:" + commodityId);
      console.log("订单号:" + orderNumber);
      this.checkStatus_i = true;
      this.checkStatus = orderNumber;
    },
    drawback(orderNumber) {
      let self = this;
      getTenantRefundAddress(orderNumber, self.platform)
        .then(res => {
          if (Boolean(res)) {
            self.drawback_i = true;
            self.tenantContacts = res.tenantContacts;
            self.tenantAddress = res.tenantAddress;
            self.tenantPhone = res.tenantPhone;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    closeDialogs(value) {
      this.drawback_i = value;
    },
    /**
     * 判断时间币与人民币格式
     **/
    formatGoodsCoin(value) {
      if (Boolean(value)) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped>
.refund_reason {
  color: red;
  margin: 0;
  text-align: left;
  padding-left: 10px;
}
.num {
  color: #999999;
  font-size: 11px;
  float: right;
}
.refund_now {
  height: 30px;
  line-height: 30px;
  padding-right: 12px;
}
.refund_btn {
  width: 70px;
  height: 28px;
  font-size: 11px;
  border: 1px solid #999999;
  background-color: white;
  color: #333333;
  border-radius: 3px;
  float: right;
}
.refund_btn_one {
  width: 70px;
  height: 28px;
  font-size: 11px;
  border: 1px solid #f10215;
  background-color: white;
  color: #f10215;
  border-radius: 3px;
  margin-left: 10px;
  float: right;
}
.real_money {
  color: #333333;
  font-size: 14px;
}
.refund_font {
  font-size: 11px;
}
.refund_money {
  float: right;
}
.color_refund {
  color: #999999;
  font-size: 10px;
}
.refund_adress {
  margin: 0;
  padding: 0px 12px 10px;
  text-align: left;
  border-bottom: 1px solid #eeeeee;
}
.refund_number {
  text-align: left;
  margin: 0;
  padding: 10px 0px 6px 12px;
}
.refund_time {
  text-align: left;
  margin: 0;
  font-size: 13px;
  height: 30px;
  line-height: 30px;
}
._time {
  float: right;
  margin-right: 12px;
}
._status {
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  color: #f10215;
  width: 82px;
  text-align: center;
  border: none;
  border-right: 1px solid #eeeeee;
  background-color: white;
}
.refund_img {
  float: left;
  width: 70px;
  height: 70px;
}
.refundlist_content {
  background-color: #f4f4f4;
  height: 94px;
  padding: 12px 12px 12px 12px;
  position: relative;
}
.refund_de {
  margin: 0;
  text-align: left;
  padding-left: 82px;
}
.refund_gui {
  margin: 0;
  text-align: left;
  padding-left: 82px;
  margin-top: 18px;
  color: #999999;
  font-size: 11px;
}
.noDataTmp {
  margin-top: 140px;
}
.noDataTmp img {
  display: inline-block;
  width: 158px;
  height: 130px;
}
.noDataTmp p {
  font-size: 13px;
  color: #999;
}
</style>
