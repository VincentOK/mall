<!--抢购列表页面-->
<template>
  <div>
    <shoptitle :childTitleword="childTitleword"></shoptitle>
    <div  v-touch:swiperight="_protypeJs.touchRight" v-if="whether_snaplist">
      <div class="snap_title">
        <label class="end_title" v-show="buttonStatus != 'pendding'">本轮抢购已结束，请等待下轮抢购开启</label>
        <label class="end_title" v-show="buttonStatus == 'pendding'">抢购中，先下单先得</label>
        <div v-show="buttonStatus != 'ending'">
          <time-down v-on:timeEnd="clearTime" :endTime='endTime' :startTime='startTime' :endTimeChar='endTimeChar' :timeStyle='indexStyle' :noNextData="noNextData"></time-down>
        </div>
      </div>
      <div class="all_snap">
        <scroller :on-infinite="infinite"  :on-refresh = "refresh" ref="myscroller" :height="_protypeJs.getScrollerHeight(65)" style="top: 65px">
        <div style="height: 1px;"></div>
        <div class="snap_list" v-for="(item,index) in snaplist" :key="index">
          <div class="snap_one">
            <div class="snap_one_left">
              <img :src="item.cover">
            </div>
            <div class="snap_one_right">
              <p class="snap_right_title">{{item.commodityName}}</p>
              <p class="snap_title_pay">
                <label class="snap_real_money">￥{{item.realityPrice | formatMoney}}</label>
                <label class="snap_money_i">￥{{item.suggestPrice | formatMoney}}</label>
              </p>
              <p class="snap_title_on">
                <label class="snap_style" v-show="item.carriage==0">{{item.carriage==0?'免邮':''}}</label>
                <label  class="snap_button" v-show="buttonStatus == 'starting'">即将开始</label>
                <router-link :to="'/detail/' + item.commodityId + '/' + item.distributionChannel" v-show="buttonStatus == 'pendding' && item.inventory != 0"><label class="snap_button" style="background-color: #ea3339;">立即抢购</label></router-link>
                <label  class="snap_button" v-show="buttonStatus == 'pendding' && item.inventory == 0" style="background-color: #333;">已抢完 </label>
                <label  class="snap_button" v-show="buttonStatus == 'ending'" style="background-color: #333;">抢购结束</label>
              </p>
            </div>
          </div>
        </div>
        </scroller>
      </div>
    </div>
    <div v-else class="noDataTmp">
      <img src="/static/img/noGoods.png" alt="">
      <p>该专区即将上架商品，请耐心等待</p>
    </div>
  </div>
</template>

<script>
import { getFlash } from "../../config/request";
import timeDown from "../publicComponent/timeDown";
// Vue.component("time-down-view", timeDown);
export default {
  name: "snapuplist",
  data() {
    return {
      noData: "",
      childTitleword: "限时抢购",
      snaplist: [],
      whether_snaplist: true,
      startTime: "",
      endTime: "",
      endTimeChar: "距下轮开启",
      indexStyle: "snapupList",
      count: 0,
      buttonStatus: null,
      noNextData: false
    };
  },
  components: {
    timeDown
  },
  mounted() {
    let self = this;
    getFlash(8, 1).then(res => {
      if (res.list.dataList.length != 0) {
        self.whether_snaplist = true
      } else {
        self.whether_snaplist = false
      }
    });
  },
  created() {
    this.isFirstEnter = true;
    // 只有第一次进入或者刷新页面后才会执行此钩子函数
    // 使用keep-alive后（2+次）进入不会再执行此钩子函数
  },
  activated() {
    console.log(
      "cashActivated:" + this.$route.meta.isBack + "=" + this.isFirstEnter
    );
    let self = this;
    if (!this.$route.meta.isBack || this.isFirstEnter) {
      console.log("cashActivated请求新数据");
      // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
      // 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
      this.ex_list = []; // 把数据清空，可以稍微避免让用户看到之前缓存的数据
      self.noData = "";
      self.count = 0;
    }
    // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
    this.$route.meta.isBack = false;
    // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
    this.isFirstEnter = false;
  },
  deactivated() {
    console.log("cashDeactivated");
  },
  beforeRouteEnter(to, from, next) {
    console.log("路由：" + from.name);
    // 路由导航钩子，此时还不能获取组件实例 `this`，所以无法在data中定义变量（利用vm除外）
    // 参考 https://router.vuejs.org/zh-cn/advanced/navigation-guards.html
    // 所以，利用路由元信息中的meta字段设置变量，方便在各个位置获取。这就是为什么在meta中定义isBack
    // 参考 https://router.vuejs.org/zh-cn/advanced/meta.html
    if (from.name == "detail") {
      to.meta.isBack = true;
      //判断是从哪个路由过来的，
      //如果是page2过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
    }

    next();
  },

  watch: {
    buttonStatus: function(value) {
      let self = this;
      if (value == "pendding") {
        self.endTimeChar = "距结束";
      }
      if (value == "ending") {
        getFlash(8, 1)
          .then(res => {
            if (res.list.dataList.length != 0) {
              if (
                self.startTime != res.startTime ||
                self.endTime != res.endTime
              ) {
                self.snaplist = [];
                self.snaplist = self.snaplist.concat(res.list.dataList);
                self.startTime = res.startTime;
                self.endTime = res.endTime;
              } else {
                self.endTime = null;
                self.startTime = null;
              }
            } else {
              self.noNextData = true;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  methods: {
    clearTime: function(value) {
      this.buttonStatus = value;
      console.log(this.buttonStatus);
    },
    getFlashData() {},
    infinite(done) {
      if (this.noData) {
        setTimeout(() => {
          this.$refs.myscroller.finishInfinite(2);
        });
        return;
      }
      let self = this; //this指向问题
      self.count++;
      setTimeout(() => {
        console.log("页码" + self.count);
        getFlash(8, self.count)
          .then(res => {
            console.log(res);
            if (res.list.dataList.length != 0) {
              self.snaplist = self.snaplist.concat(res.list.dataList);
              if (Boolean(res.startTime) && Boolean(res.endTime)) {
                self.startTime = res.startTime;
                self.endTime = res.endTime;
              } else {
                self.endTime = "0";
                self.startTime = "0";
              }
            } else {
              self.noData = "没有更多数据";
            }
            self.$refs.myscroller.resize();
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
    }
  }
};
</script>

<style scoped>
.snap_title {
  width: 100%;
  margin: auto;
  position: fixed;
  top: 40px;
  z-index: 99999;
  background-color: white;
  height: 29px;
  line-height: 29px;
  border-top: 1px solid #f9f9f9;
  border-bottom: 1px solid #f9f9f9;
}
.end_title {
  font-size: 12px;
  color: #333;
  float: left;
  margin-left: 10px;
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
  height: 35px;
  padding-bottom: 0;
  margin-bottom: 0;
  line-height: 35px;
  overflow: hidden;
}
.snap_real_money {
  color: #ea3339;
  font-size: 16px;
  font-weight: 600;
}
.snap_money_i {
  color: darkgray;
  text-decoration: line-through;
  margin-left: 8px;
}
.snap_style {
  color: #ea3339;
  padding: 3px 8px;
  background-color: #fff4ec;
}
.snap_button {
  float: right;
  height: 35px;
  line-height: 35px;
  padding: 0 10px;
  background-color: #11bb55;
  color: white;
  border-radius: 5px;
}

</style>
