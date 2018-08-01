<template>
<div>
  <div class="refundlist" v-for="item in refund_list" :key="item">
    <div class="null_div"></div>
      <p class="refund_time">{{item.goods_time}}</p>
    <div class="refundlist_content">
      <img class="refund_img" :src="item.goods_img" alt="">
      <p>{{item.goods_title}}</p>
      <label class="num">x{{item.goods_count}}</label>
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
      <button v-on:click="gotodetail(item.goods_id)">申请退款</button>
    </p>
  </div>


</div>
</template>

<script>
    export default {
        name: "refundlist",
        data(){
          return{
            refund_list:[]
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
        gotodetail:function (id) {
          console.log(id)
          this.$router.push('/refundindex/'+id)
        }
      }
    }
</script>

<style scoped>
  .num{
    position: absolute;
    right: 12px;
    bottom: 12px;
    color: #999999;
  }
  .refund_now{
    height: 35px;
    line-height: 35px;
    padding-right: 12px;
  }
  .refund_now button{
    width: 70px;
    height: 25px;
    font-size: 10px;
    border: 1px solid #ec414d;
    background-color: white;
    color: #ec414d;
    border-radius: 3px;
    float: right;
  }
  .real_money{
    color: #ec414d;
    font-size: 13px;
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
    margin-left: 12px;
    font-size: 13px;
    height: 30px;
    line-height: 30px;
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
  .refundlist_content p{
    margin: 0;
    text-align: left;
    padding-left: 82px;
  }

</style>
