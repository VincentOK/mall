<!--选择支付方式-->
<template>
    <div class="paymoney">
      <div class="pay_fiex" v-on:click="closeModel"></div>
      <div class="pay_money">
        <div>
          <img v-on:click="closeModel" class="pay_money_close" src="/static/img/pay_close.png" alt="">
          <p class="pay_money_title">确认支付</p>
        </div>
        <div class="pay_style">
          <p class="pay_style_one">请选择支付方式</p>
          <p class="alipay" v-on:click="chooseAlipay">
            <img class="pay_one" src="/static/img/play@2x.png" alt="">
            <label class="pay_two">支付宝支付</label>
            <img class="pay_th" :src="alicheck" alt="">
          </p>
          <p class="wechat"  v-on:click="chooseWechat">
            <img class="pay_one"  src="/static/img/wechat@2x.png" alt="">
            <label class="pay_two">微信支付</label>
            <img class="pay_th" :src="wechatcheck" alt="">
          </p>

          <p class="wechat"  v-on:click="chooseChina">
            <img class="pay_one"  src="/static/img/card.png" alt="">
            <label class="pay_two">银行卡支付</label>
            <img class="pay_th" :src="chinacheck" alt="">
          </p>
        </div>

        <div class="get_ticket">
          <p class="need_ticket">
            <img v-on:click="chooseTicket" :src="ticket" alt="">
            <label>需要开具发票</label>
          </p>


          <div v-if="needticket">
              <p class="ticket_style">
                <label>发票类型：</label>
                <label  v-bind:class="choose_style ? 'person_i' : 'style_i'" v-on:click="chooseStyle">普通发票</label>
                <label  v-bind:class="choose_style ? 'style_i' : 'person_i'" v-on:click="chooseStyle">增值税专用发票</label>
              </p>
              <p class="ticket_style" style="padding-bottom: 16px">
                <label>发票抬头：</label>
                <label  v-bind:class="choose_style_ticket ? 'person_i_i' : 'style_i_i'" v-on:click="chooseStyleTicket">个人</label>
                <label  v-bind:class="choose_style_ticket ? 'style_i_i' : 'person_i_i'" v-on:click="chooseStyleTicket">单位</label>
              </p>
              <div class="input_word">
                <input type="text" placeholder="请填写单位名称">
                <input type="text" placeholder="请填写纳税人识别号">
              </div>
          </div>

          <div>
            <p class="goods_money">
              <label>商品总额</label>
              <label class="money_all">￥34.00</label>
            </p>
            <p class="yun_money">
              <label>运费</label>
              <label class="money_all">￥34.00</label>
            </p>
          </div>

        </div>
        <div class="pay_style_btn">
          <label class="wai_label">实付款：<label class="all_money_i"><label class="money_ii">￥</label>49.00</label></label>
          <button>确认付款</button>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "paymoney",
        data (){
          return {
            paymoney_status:false,
            choose_style:true,
            choose_style_ticket:true,
            ticket:'/static/img/5@2xuncheck.png',
            needticket:false,
            alicheck:'/static/img/select@2x.png',
            wechatcheck:'/static/img/uncheck.png',
            chinacheck:'/static/img/uncheck.png'
          }
        },
      methods:{
        chooseStyle:function(){
          if(this.choose_style){
            this.choose_style = false
          }else {
            this.choose_style = true
          }
        },
        chooseStyleTicket:function(){
          if(this.choose_style_ticket){
            this.choose_style_ticket = false
          }else {
            this.choose_style_ticket = true
          }
        },
        chooseTicket:function(){
          let mychoose = this.ticket
          if(mychoose == "/static/img/5@2x.png"){
            this.ticket = '/static/img/5@2xuncheck.png'
            this.needticket = false
          }else {
            this.ticket = '/static/img/5@2x.png'
            this.needticket = true
          }
        },
        closeModel:function () {
          this.$emit('childByValue',this.paymoney_status)
        },
        chooseAlipay:function () {
          this.alicheck = '/static/img/select@2x.png'
          this.wechatcheck = '/static/img/uncheck.png'
          this.chinacheck = '/static/img/uncheck.png'
        },
        chooseWechat:function () {
          this.wechatcheck = '/static/img/select@2x.png'
          this.alicheck = '/static/img/uncheck.png'
          this.chinacheck = '/static/img/uncheck.png'
        },
        chooseChina:function () {
          this.chinacheck = '/static/img/select@2x.png'
          this.alicheck = '/static/img/uncheck.png'
          this.wechatcheck = '/static/img/uncheck.png'
        }
      }
    }
</script>

<style scoped>
  .wai_label{
    margin-left: 5%;
  }
  .money_ii{
    font-size: 19px;
  }
  .all_money_i{
    color: #f10215;
    font-size: 27.5px;
    font-weight: 600;
  }
  .pay_style_btn{
    width: 100%;
    height: 49px;
    line-height: 49px;
    margin: auto;
    font-size: 14px;
    border-top: 1px solid #eeeeee;
    text-align: left;
  }
  .pay_style_btn button{
    background-color: #f10215;
    color: white;
    border: none;
    height: 49px;
    line-height: 49px;
    width: 134px;
    font-size: 16px;
    float: right;
  }
  .goods_money{
    margin: 0;
    text-align: left;
    margin-top: 13px;
    margin-bottom: 22px;
  }
  .yun_money{
    margin: 0;
    margin-bottom: 22px;
    text-align: left;
  }
  .money_all{
    float: right;
  }
  .input_word{
    border-bottom: 1px solid #eeeeee;
  }
  .input_word input{
    border: 1px solid #eeeeee;
    width: 100%;
    height: 36px;
    line-height: 36px;
    text-indent: 10px;
    margin-bottom: 16px;
    color: grey;
    outline: none;
  }
  .get_ticket{
    width: 90%;
    margin: auto;
  }
  .ticket_style{
    margin: 0;
    padding-bottom: 28px;
    text-align: left;
  }
  .ticket_style label:first-child{
    margin-left: 20px;
    font-size: 12px;
  }
  .ticket_style label:nth-child(2){
    margin-left: 10px;
  }
  .ticket_style label:nth-child(3){
    margin-left: 24px;
  }
  .style_i_i{
    color: #333333;
    border: 1px solid grey;
    padding: 3px 8px;
    font-size: 11px;
    border-radius: 10px;
  }
  .person_i_i{
    color: #f10215;
    border: 1px solid #f10215;
    padding: 3px 8px;
    font-size: 11px;
    border-radius: 10px;
  }
  .style_i{
    color: #333333;
    border: 1px solid grey;
    padding: 3px 8px;
    font-size: 11px;
    border-radius: 10px;
  }
  .person_i{
    color: #f10215;
    border: 1px solid #f10215;
    padding: 3px 8px;
    font-size: 11px;
    border-radius: 10px;
  }
  .need_ticket img{
    width: 12px;
    height: 12px;
    position: absolute;
    top: 17px;
    left: 0;
  }
  .need_ticket{
    margin: 0;
    text-align: left;
    position: relative;
    padding-top: 15px;
    padding-bottom: 22px;
    font-size: 13px;
  }
  .need_ticket label{
    margin-left: 20px;
  }

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
    font-size: 18px;
    text-align: center;
    width: 90%;
    margin: 0;
    margin: auto;
    height: 43px;
    line-height: 43px;
    border-bottom: 1px solid #eeeeee;

  }
  .pay_money_close{
    width: 15px;
    position: absolute;
    top: 16px;
    left: 28px;
  }
  .pay_style{
    width: 90%;
    margin: auto;
    font-size: 14px;
    border-bottom: 1px solid #eeeeee;
  }

  .pay_style_one{
    text-align: left;
    font-size: 13px;
    color: #9b9b9b;
    margin: 17px 0 17px 0;
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
    font-size: 14px;
    line-height: 30px;
    margin-left: 10px;
  }
  .pay_th{
    float: right;
    width: 20px;
    margin-top: 5px;
  }
</style>
