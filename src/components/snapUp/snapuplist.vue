<!--抢购列表页面-->
<template>
  <div>
    <shoptitle :childTitleword="childTitleword"></shoptitle>
    <div  v-touch:swiperight="_protypeJs.touchRight">
      <div class="snap_title">
        <p>
          <label class="end_title">本轮抢购已结束，请等待下轮抢购开启</label>
          <time-down-view @time-end="clearTime = true" :endTime='endTime' :endTimeChar='endTimeChar' :timeStyle='indexStyle'></time-down-view>
        </p>
      </div>
      <div class="all_snap">
        <scroller style="margin-top: 80px" :on-infinite="infinite"  :on-refresh = "refresh" ref="myscroller">
        <div style="height: 1px;"></div>
        <div class="snap_list" v-for="(item,index) in snaplist" :key="index">
          <div class="snap_one">
            <div class="snap_one_left">
              <img :src="item.goods_img" alt="">
            </div>
            <div class="snap_one_right">
              <p class="snap_right_title">{{item.goods_title}}</p>
              <p class="snap_title_pay">
                <label class="snap_real_money">￥{{item.goods_realmoney}}</label>
                <label class="snap_money_i">￥{{item.goods_anothmoney}}</label>
              </p>
              <p class="snap_title_on">
                <label class="snap_style">{{item.goods_courier}}</label>
                <router-link :to="'/detail/' + item.goods_id"><label class="snap_button">即将开始</label></router-link>
              </p>
            </div>
          </div>
        </div>
        </scroller>
      </div>
    </div>
  </div>
</template>

<script>
  import { getFlash } from '../../config/request'
import timeDown from "../publicComponent/timeDown";
export default {
  name: "snapuplist",
  data() {
    return {
      childTitleword:'限时抢购',
      snaplist: [],
      clearTime: false,
      endTime: "2018-08-20 05:40:20",
      endTimeChar: "距下轮开启",
      indexStyle: "snapupList"
    };
  },
  components: {
    timeDown
  },
  mounted() {
    this.snaplist = [
      {
        goods_id: 1,
        goods_img: "/static/img/a1.jpg",
        goods_title: "越南美女限时抢购越南美女限时抢购越南美女限时抢购",
        goods_realmoney: 33.0,
        goods_anothmoney: 28.0,
        goods_courier: "免邮",
        goods_status: 2
      },
      {
        goods_id: 2,
        goods_img: "/static/img/a1.jpg",
        goods_title: "越南美女限时抢购越南美女限时抢购越南美女限时抢购",
        goods_realmoney: 33.0,
        goods_anothmoney: 28.0,
        goods_courier: "免邮",
        goods_status: 3
      },
      {
        goods_id: 3,
        goods_img: "/static/img/a1.jpg",
        goods_title: "越南美女限时抢购越南美女限时抢购越南美女限时抢购",
        goods_realmoney: 33.0,
        goods_anothmoney: 28.0,
        goods_courier: "免邮",
        goods_status: 1
      },
      {
        goods_id: 4,
        goods_img: "/static/img/a1.jpg",
        goods_title: "越南美女限时抢购越南美女限时抢购越南美女限时抢购",
        goods_realmoney: 33.0,
        goods_anothmoney: 28.0,
        goods_courier: "免邮",
        goods_status: 4
      }
    ];
  },
  methods: {
    infinite(done) {
      /**
      if(this.noData) {
        setTimeout(()=>{
          this.$refs.myscroller.finishInfinite(2);
        })
        return;
      }
      let self = this;//this指向问题
      self.count++;
      setTimeout(() => {
        console.log("页码"+self.count)
        getFlash(self.count,8).then(res =>{
          console.log(res)
          if(res.dataList.length != 0){
            self.snaplist = self.snaplist.concat(res.dataList)
          }else {
            self.noData = "没有更多数据"
          }
          self.$refs.myscroller.resize();
          done()
        }).catch(err =>{
          console.log(err)
        })
      }, 1500)
       **/
    },
    refresh(done) {
      //这是向下滑动的时候请求最新的数据
      console.log("向下滑动");
      setTimeout(() => {
        done();
      }, 1500);
      // this.offset = 0
      // this.getDate(1, done)
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
  width: 100%;
  height: 100%;
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
