<!--时间币支付-->
<template>
  <div class="paymoney">
    <div class="pay_fiex"></div>
    <div class="pay_money">
      <div>
        <img  v-on:click="closeModel" class="pay_money_close" src="/static/img/pay_close.png" alt="">
        <p class="pay_money_title">确认支付</p>
      </div>
      <div class="pay_style pay_time">
        <label class="exchange_border">&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <label class="time_i">33.00</label>
      </div>
      <div class="pay_style">
        <button>确认支付</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "paymoney",
    data (){
      return {
      }
    },
    methods:{
      closeModel:function () {
        this.$emit('childByValue',false)
      }
    }
  }
</script>

<style scoped>
  .pay_fiex{
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: black;
    opacity: 0.5;
    top: 0;
    bottom: 0;
    z-index: 10;
  }
  .pay_time{
    padding: 40px 0;
  }
  .exchange_border{
    width: 70px;
    height: 70px;
    color: white;
    background-color: #efbf19;
    border-radius: 50%;
  }
  .time_i{
    font-size: 20px;
  }
  .pay_money{
    background-color: white;
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 20;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  .pay_money_title{
    font-size: 14px;
    text-align: center;
  }
  .pay_money_close{
    width: 20px;
    margin-left: 15px;
    position: absolute;
    left: 5%;

  }
  .pay_money_m{
    font-size: 18px;
    font-weight: 600;
    width: 90%;
    margin: auto;
    border-bottom: 1px solid #f9f9f9;
  }
  .pay_style{
    width: 90%;
    margin: auto;
    font-size: 14px;
    border-bottom: 1px solid #f9f9f9;
  }
  .pay_style button{
    background-color: #ea3339;
    color: white;
    height: 45px;
    width: 90%;
    border-radius:30px;
    border: none;
    font-size: 15px;
    margin-top: 10px;
    margin-bottom: 15px;
  }
  .pay_style_one{
    text-align: left;
    font-size: 12px;
    color: #9b9b9b;
  }
  .alipay,.wechat{
    height: 30px;
    margin-bottom: 20px;
  }
  .pay_one{
    float: left;
    width: 30px;
  }
  .pay_two{
    float: left;
    height: 30px;
    line-height: 30px;
    margin-left: 10px;
  }
  .pay_th{
    float: right;
    width: 20px;
    margin-top: 5px;
  }
</style>
