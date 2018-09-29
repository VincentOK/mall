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

          <div  v-for="(item,index) in payStyle" :key="index">
            <p class="alipay" v-on:click="chooseAlipay(item.payTypeId)">
              <!--<img class="pay_one"  :src="item.img" alt="">-->
              <label class="pay_two">{{item.typeName}}</label>
              <img class="pay_th" v-if="item.flag" src="/static/img/select@2x.png" alt="">
              <img class="pay_th" v-else src="/static/img/uncheck.png" alt="">
            </p>

            <!--<p class="wechat"  v-on:click="chooseWechat">-->
              <!--<img class="pay_one"  src="/static/img/wechat@2x.png" alt="">-->
              <!--<label class="pay_two">微信支付</label>-->
              <!--<img class="pay_th" :src="wechatcheck" alt="">-->
            <!--</p>-->

            <!--<p class="wechat"  v-on:click="chooseChina">-->
              <!--<img class="pay_one"  src="/static/img/card.png" alt="">-->
              <!--<label class="pay_two">银行卡支付</label>-->
              <!--<img class="pay_th" :src="chinacheck" alt="">-->
            <!--</p>-->
          </div>
        </div>

        <div class="get_ticket">


          <div v-if="this.paySticket">
              <p class="need_ticket">
                <img v-on:click="chooseTicket" :src="ticket" alt="">
                <label>需要开具发票</label>
              </p>
              <div v-if="needticket">


                  <p class="ticket_style">
                    <label>发票类型：</label>
                    <label v-for="(item,index) in paySticket" :key="index">
                      <label :class="item.flag?'person_i':'style_i'" v-on:click="choose_style_fn(item.typeId)">{{item.typeName}}</label>
                    </label>
                    <!--<label v-for="(item,index) in paySticket" :key="index" v-bind:class="choose_style ? 'person_i' : 'style_i'" v-on:click="chooseStyle">普通发票</label>-->
                    <!--<label  v-bind:class="choose_style ? 'style_i' : 'person_i'" v-on:click="chooseStyle">增值税专用发票</label>-->
                  </p>
                  <p class="ticket_style" style="padding-bottom: 16px"  v-for="(item,index) in paySticket" :key="index">
                    <span v-if="item.typeId === 1 && item.flag === true">
                      <label>发票抬头：</label>
                      <label  v-bind:class="choose_style_ticket_i ? 'person_i_i' : 'style_i_i'" v-on:click="chooseStyleTicket_i">个人</label>
                      <label  v-bind:class="choose_style_ticket_j ? 'person_i_i' : 'style_i_i'" v-on:click="chooseStyleTicket_j">单位</label>
                    </span>
                    <span  v-if="item.typeId === 2 && item.flag === true">商户将联系您沟通开具发票相关事项，请保持联系方式畅通。</span>
                  </p>
                  <div class="input_word" v-for="(item,index) in paySticket" :key="index"  v-if="item.typeId === 1 && item.flag === true &&  choose_style_ticket_j">
                    <input type="text" v-model="ponenyname" placeholder="请填写单位名称">
                    <input type="text" v-model="ponenynum" placeholder="请填写纳税人识别号">
                  </div>

              </div>

          </div>


          <div>
            <p class="goods_money">
              <label>商品总额</label>
              <label class="money_all"  v-if="this.paymoneyMsg.msg.realityPrice !== undefined">￥{{(this.paymoneyMsg.msg.realityPrice)*(this.paymoneyMsg.msg.count)}}</label>
              <label class="money_all"  v-if="this.paymoneyMsg.msg.timecoinPrice !== undefined"><img class="time_icon" style="height: 14px;width: 14px;" src="/static/img/icon@2x.png" alt="">{{(this.paymoneyMsg.msg.timecoinPrice)*(this.paymoneyMsg.msg.count)}}</label>
            </p>
            <p class="yun_money">
              <label>运费</label>
              <label class="money_all">￥{{this.paymoneyMsg.msg.carriage }}</label>
            </p>
          </div>
        </div>
        <div class="pay_style_btn">
          <label class="wai_label">实付款：
            <label class="all_money_i" v-if="this.paymoneyMsg.msg.realityPrice !== undefined">
              <label class="money_ii">￥</label>
              {{((this.paymoneyMsg.msg.realityPrice)*(this.paymoneyMsg.msg.count))+this.paymoneyMsg.msg.carriage}}
            </label>

            <label class="all_money_i" v-if="this.paymoneyMsg.msg.timecoinPrice !== undefined">
              <img class="time_icon" style="height: 16px;width: 16px;" src="/static/img/icon@2x.png" alt="">{{((this.paymoneyMsg.msg.timecoinPrice)*(this.paymoneyMsg.msg.count))+'+￥'+this.paymoneyMsg.msg.carriage }}
            </label>
          </label>
          <button @click="surepaymoney">确认付款</button>
        </div>
        <dialog-view  :dialogblock="dialogblock"></dialog-view>
      </div>
    </div>
</template>

<script>
  import Vue from 'vue'
  import { payMoney } from "../../config/request";
  import mydialog from '../dialog/mydialog'
  Vue.component('dialog-view',mydialog)
  export default {
        name: "paymoney",
        comments:{
          mydialog
        },
        props:['paymoneyMsg'],
        data (){
          return {
            dialogblock:{
              flag:false,
              msg:''
            },
            ponenyname:'',
            ponenynum:'',
            paymoney_status:false,
            choose_style_ticket_i:true,
            choose_style_ticket_j:false,
            ticket:'/static/img/5@2xuncheck.png',
            needticket:false,
            payStyle:null,
            paySticket:null
          }
        },
      watch: {
        paymoneyMsg: function(newVal,oldVal){
          console.log("aaaaaaaaaa"+newVal)
          console.log("bbbbbbbbbbbb"+oldVal)
        }
      },
      created(){
        console.log("人民币支付信息："+JSON.stringify(this.paymoneyMsg.msg.realityPrice));
        if(this.paymoneyMsg.msg.distributionChannel === '1' || (this.paymoneyMsg.msg.distributionChannel === '2' && this.paymoneyMsg.msg.carriage !== 0)){
          this.payStyle = JSON.parse(this._protypeJs.getPlatform('commodityPayType'));
          this.paySticket = JSON.parse(this._protypeJs.getPlatform('commodityInvoiceType'));
        }
        console.log(this.payStyle)
      },
      mounted(){
        window['payMoneyStatus'] = (Boolean) => {
          // alert("8888888888");
          this.payBoolean(Boolean);
        }
      },
      destroyed(){
          window.localStorage.removeItem('commodityPayType');
        window.localStorage.removeItem('commodityInvoiceType')
      },
      methods:{
          /**
           * android&IOS调用支付返回支付状态
           */
          payBoolean(Boolean){
            // alert("android调用了JS函数");
            if(Boolean){
              this.$emit('childByValue',this.paymoney_status)
            }else {
              this.$emit('childByValue',this.paymoney_status)
            }
          },
          /**
           * 获取支付方式
           */
          getPayStyle(arrStyle){
            for (let i = 0;i<arrStyle.length;i++){
              if(arrStyle[i].flag){
                return arrStyle[i].payTypeId
              }
            }
          },
        /**
         * 获取发票类型
         */
        getPayTicket(arrStyle){
          for (let i = 0;i<arrStyle.length;i++){
            if(arrStyle[i].flag){
              return arrStyle[i].typeId
            }
          }
        },
        /**
         * 确认支付
         */
        surepaymoney:function(){
          let obj = this.paymoneyMsg;//支付信息
          let payStatus = this.getPayStyle(this.payStyle);
          let payTicket = null;
          if(this.paySticket){
             payTicket = this.getPayTicket(this.paySticket);
          }

          if(payStatus){
            obj.msg.payTypeId = payStatus;
          }
          if(payTicket && this.needticket){
            obj.msg.invoiceTypeId = payTicket;
            if(payTicket === 1 && this.choose_style_ticket_j){
              if(this.ponenyname && this.ponenynum){
                obj.msg.invoiceName =this.ponenyname;
                obj.msg.invoiceCode =this.ponenynum
              }else{
                this.dialogblock = {
                  flag:true,
                  msg:'请填写发票信息'
                };
                return false;
              }
            }else {
              delete obj.msg.invoiceName;
              delete obj.msg.invoiceCode;
            }
          }else {
           delete obj.msg.invoiceTypeId
          }
          alert("创建预支付信息："+JSON.stringify(obj.msg));
          payMoney(obj.msg).then(res =>{
            console.log("支付成功回显："+res);
            if(res.orderStatus === "1"){//调起app支付
             alert("订单号："+res.orderNumber);
             if(obj.msg.payTypeId === 2){//代表支付宝支付
               this.appJS.appSurePayMoney(res.orderNumber,0);
             }else {//微信支付
               this.appJS.appSurePayMoney(res.orderNumber,1);
             }
            }else {//支付完成
              alert('支付完成');
              // this._protypeJs.removeBodyHeight();
              this.$emit('childByValue',this.paymoney_status)
            }
          }).catch(err =>{
            console.log(err)
          })
          // this._protypeJs.appSurePayMoney(obj);
        },
        /**
         * 选择支付抬头
         */
        chooseStyleTicket_i:function(){
          this.choose_style_ticket_i = true
          this.choose_style_ticket_j = false
        },
        chooseStyleTicket_j:function(){
          this.choose_style_ticket_i = false
          this.choose_style_ticket_j = true
        },
        /**
         * 选择发票类型
         */
        choose_style_fn(val){
          console.log(val)
          let ticket = this.paySticket
          for (let i = 0;i<ticket.length;i++){
            if (ticket[i].typeId === val) {
              ticket[i].flag = true
            }else {
              ticket[i].flag = false
            }
          }
          this.paySticket = ticket
        },
        /**
         * 是否需要开发票
         */
        chooseTicket:function(){
          let mychoose = this.ticket;
          if(mychoose == "/static/img/5@2x.png"){
            this.ticket = '/static/img/5@2xuncheck.png'
            this.needticket = false;
          }else {
            this.ticket = '/static/img/5@2x.png'
            this.needticket = true
          }
        },
        /**
         * 关闭支付弹框
         */
        closeModel:function () {
          this.$emit('childByValue',this.paymoney_status)
        },
        /**
         * 选择支付方式
         * @param val
         */
        chooseAlipay:function (val) {
          console.log("支付方式ID："+val);
          let arrStyle = this.payStyle;
          for (let i = 0;i<arrStyle.length;i++){
            if(arrStyle[i].payTypeId === val){
              arrStyle[i].flag = true
            }else {
              arrStyle[i].flag = false
            }
          }
          // console.log("支付方式ID："+JSON.stringify(arrStyle));
          this.payStyle = arrStyle
          console.log(this.payStyle)
        }
      }
    }
</script>

<style scoped>
  .paymoney{
    height: 100%;
    width: 100%;
    overflow: scroll;
  }
  .wai_label{
    margin-left: 5%;
  }
  .money_ii{
    font-size: 19px;
  }
  .all_money_i{
    color: #f10215;
    font-size: 24px;
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
    margin-bottom: 10px;
  }
  .yun_money{
    margin: 0;
    margin-bottom: 10px;
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
    margin-bottom: 10px;
    color: grey;
    outline: none;
  }
  .get_ticket{
    width: 90%;
    margin: auto;
  }
  .ticket_style{
    margin: 0;
    padding-bottom: 14px;
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
    padding-bottom: 10px;
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
  z-index: 99999;
}
  .pay_money{
    background-color: white;
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 999999;
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
    margin-bottom: 10px;
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
