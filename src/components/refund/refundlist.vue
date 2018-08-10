<template>
<div>
  <scroller style="margin-top: 50px" :on-infinite="infinite"  :on-refresh = "refresh" ref="myscroller">
    <div style="height: 1px;"></div>
  <div class="refundlist" v-for="(item,index) in refund_list" :key="index">
    <div class="null_div"></div>
      <p class="refund_time">
        <button class="_status">待收货</button>
        <label class="_time">{{item.goods_time}}</label>
      </p>
    <div class="refundlist_content">
      <img class="refund_img" :src="item.goods_img" alt="">
      <p class="refund_de">{{item.goods_title}}</p>
      <p class="refund_gui">
        规格：盆
        <label class="num">x{{item.goods_count}}</label>
      </p>
    </div>
    <p class="refund_number">
      <label class="refund_font">订单号：</label>
      <label class="color_refund">{{item.goods_number}}</label>
    </p>
    <p class="refund_adress">
      <label class="refund_font">快递运单号：</label>
      <label class="color_refund">{{item.goods_realnum}}</label>
      <label class="refund_money"><label class="refund_font">实付：</label><label class="real_money">￥{{item.goods_money}}</label></label>
    </p>
    <p class="refund_now">
      <button class="refund_btn_one" v-on:click="gotocheck(item.goods_id)">确认收货</button>
      <button class="refund_btn" v-on:click="gotodetail(item.goods_id)">申请退款</button>
    </p>
  </div>
  </scroller>
  <refund_dialog-view :checkStatus="checkStatus"></refund_dialog-view>
</div>
</template>

<script>
  import Vue from 'vue'
  import refund_dialog from '../dialog/refund_dialog'
  Vue.component('refund_dialog-view',refund_dialog)
    export default {
        name: "refundlist",
      comments:{
        refund_dialog
      },
        props:['refund_status'],
        data(){
          return{
            refund_list:[],
            offset:1,
            checkStatus:'',
            noData:'',
          }
        },
      watch:{
        refund_status:function(newold,oldword){
            console.log("新状态："+newold)
            console.log("旧状态："+oldword)
          }
      },
      mounted(){
          this.refund_list = [
            {
              goods_id:1,
              goods_time:'2018-07-04 18:31',
              goods_img:'/static/img/a1.jpg',
              goods_title:'越南美女免费包邮越南美女免费包邮越南美女免费包邮越南美女免费包邮',
              goods_count:77,
              goods_number:'XS5566ADS656',
              goods_realnum:'未获取运单号',
              goods_money:19.90,
            },
            {
              goods_id:2,
              goods_time:'2018-07-04 18:31',
              goods_img:'/static/img/a1.jpg',
              goods_title:'越南美女免费包邮越南美女免费包邮越南美女免费包邮越南美女免费包邮',
              goods_count:88,
              goods_number:'XS5566ADS656',
              goods_realnum:'未获取运单号',
              goods_money:29.90,
            },
            {
              goods_id:3,
              goods_time:'2018-07-04 18:31',
              goods_img:'/static/img/a1.jpg',
              goods_title:'越南美女免费包邮越南美女免费包邮越南美女免费包邮越南美女免费包邮',
              goods_count:99,
              goods_number:'XS5566ADS656',
              goods_realnum:'未获取运单号',
              goods_money:39.90,
            },
          ]
      },
      methods:{
        infinite (done) {
          console.log("向上滑动")

          this.offset++    //每当向上滑动的时候就让页数加1
          console.log("向上滑动页码:"+ this.offset)
          console.log("done:"+done)
          if(this.noData) {
            setTimeout(()=>{
              this.$refs.myscroller.finishInfinite(2);
            })
            return;
          }
          let self = this;//this指向问题
          let start = this.refund_list.length;
          let obj = {
            goods_id:1,
            goods_time:'2018-07-04 18:31',
            goods_img:'/static/img/a1.jpg',
            goods_title:'越南美女免费包邮越南美女免费包邮越南美女免费包邮越南美女免费包邮',
            goods_count:77,
            goods_number:'XS5566ADS656',
            goods_realnum:'未获取运单号',
            goods_money:19.90,
          }
          setTimeout(() => {
            self.refund_list.push(obj)
            if(start > 10) {
              self.noData = "没有更多数据"
            }
            self.$refs.myscroller.resize();
            done()
          }, 1500)
          // done(function (e) {
          //   console.log(e)
          // })
          // this.getDate(this.offset, done)
        },
        refresh (done) { //这是向下滑动的时候请求最新的数据
          console.log("向下滑动")
          setTimeout(() => {
            done()
          }, 1500)
          // this.offset = 0
          // this.getDate(1, done)
        },
        gotodetail:function (id) {
          console.log(id)
          this.$router.push('/refundindex/'+id)
        },
        gotocheck:function (id) {
          console.log("id:"+id)
          this.checkStatus = id
        }
      }
    }
</script>

<style scoped>
  .num{
    color: #999999;
    font-size: 11px;
    float: right;
  }
  .refund_now{
    height: 49px;
    line-height: 49px;
    padding-right: 12px;
  }
  .refund_btn{
    width: 65px;
    height: 28px;
    font-size: 11px;
    border: 1px solid #999999;
    background-color: white;
    color: #333333;
    border-radius: 3px;
    float: right;
  }
  .refund_btn_one{
    width: 65px;
    height: 28px;
    font-size: 11px;
    border: 1px solid #f10215;
    background-color: white;
    color: #f10215;
    border-radius: 3px;
    margin-left: 10px;
    float: right;
  }
  .real_money{
    color: #333333;
    font-size: 14px;
  }
  .refund_font{
    font-size: 11px;
  }
  .refund_money{
    float: right;
  }
  .color_refund{
    color: #999999;
    font-size: 10px;
  }
  .refund_adress{
    margin: 0;
    padding: 0px 12px 10px;
    text-align: left;
    border-bottom: 1px solid #eeeeee;
  }
  .refund_number{
    text-align: left;
    margin: 0;
    padding: 10px 0px 6px 12px;
  }
  .refund_time{
    text-align: left;
    margin: 0;
    font-size: 13px;
    height: 30px;
    line-height: 30px;
  }
  ._time{
    float: right;
    margin-right: 12px;
  }
  ._status{
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
.refund_img{
  float: left;
  width: 70px;
  height: 70px;
}
  .refundlist_content{
    background-color: #f4f4f4;
    height: 70px;
    padding: 12px 12px 12px 12px;
    position: relative;
  }
  .refund_de{
    margin: 0;
    text-align: left;
    padding-left: 82px;
  }
  .refund_gui{
    margin: 0;
    text-align: left;
    padding-left: 82px;
    margin-top: 22px;
    color: #999999;
    font-size: 11px;
  }

</style>
