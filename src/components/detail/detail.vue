<!--商品详情-->
<template>
  <div>
    <shoptitle v-bind:childTitleword="childTitleword"></shoptitle>
  <div class="conent_all_h5">
    <div class="title_i">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item,index) in goodsDetail.imgList" :key="index"><img class="detail_img" :src="item.imgUrl"></swiper-slide>
        <!--<swiper-slide><img  class="detail_img" src="/static/img/a1.jpg"></swiper-slide>-->
        <!--<swiper-slide><img  class="detail_img" src="/static/img/a1.jpg"></swiper-slide>-->
        <!--<swiper-slide><img class="detail_img"  src="/static/img/a1.jpg"></swiper-slide>-->
      </swiper>
      <div class="swiper-pagination" style="width: 40px;height: 22.5px;text-align: center;line-height: 22.5px;background-color: black;opacity:0.5;font-size: 11px;border-radius: 12px;color: white;left: 85%" slot="pagination"></div>
    </div>
    <div   v-touch:swiperight="_protypeJs.touchRight">
        <div class="title_j">
          <p class="detail_tatle">
            <label class="detail_hot">热门</label>
            <label class="word_hot">{{goodsDetail.map.commodityName}}</label>
          </p>
          <p class="detail_money">
            <label class="money_real"  v-if="goodsDetail.map.realityPrice">
              <label class="fontM">￥</label>
              {{(goodsDetail.map.realityPrice)/100}}
            </label>
            <label class="money_real"  v-if="goodsDetail.map.timecoinPrice">
              <!--<label class="fontM">时间币</label>-->
              <img class="time_icon" style="height: 16px;width: 16px;" src="/static/img/icon@2x.png" alt="">
              &nbsp; &nbsp; &nbsp;{{(goodsDetail.map.timecoinPrice)/100}}
            </label>
            <label class="money_over"   v-if="goodsDetail.map.suggest_price"><label class="fontM_i">￥</label>{{(goodsDetail.map.suggestPrice)/100}}</label>
            <label class="money_over_count">剩余{{goodsDetail.map.inventory}}件</label>
          </p>
        </div>
        <div class="null_div"></div>
        <div class="adress_detail_all">
          <div class="adress_detail">
            <div class="adress_left">
              <p class="word_moren">送至</p>
            </div>
            <div class="adress_right" v-on:click="addAdress">
              <p>
                <label v-if="goodsDetail.addressMap">{{goodsDetail.addressMap.shippingName}}</label>
                <label v-if="goodsDetail.addressMap" class="adress_tel">{{goodsDetail.addressMap.shippingPhone}}</label>
                <img class="right_img" src="/static/img/right.png" alt="">
              </p>
              <p class="adress_relative" v-if="goodsDetail.addressMap">
                <img  v-if="goodsDetail.addressMap.shippingAddress" src="/static/img/address.png" alt="">
                <label>{{goodsDetail.addressMap.shippingAddress}}&nbsp;&nbsp;{{goodsDetail.addressMap.detailAddress}}</label>
              </p>
            </div>
          </div>
          <div class="adress_detail">
            <div class="adress_left">
              <p class="word_moren">规格</p>
            </div>
            <div class="adress_right">
              <p>{{goodsDetail.map.unit}}</p>
            </div>
          </div>
          <div class="adress_detail">
            <div class="adress_left">
              <p class="word_moren">运费</p>
            </div>
            <div class="adress_right">
              <p v-if="goodsDetail.map.carriage === 0">包邮</p>
              <p v-else>{{(goodsDetail.map.carriage)/100}}</p>
            </div>
          </div>
        </div>
        <div class="null_div"></div>
        <div class="adress_detail_all">
          <div class="adress_detail last_count">
          <div class="adress_left">
            <p class="word_moren">数量</p>
          </div>
          <div class="adress_right">
            <div class="right_count">
              <button class="add_count" v-on:click="addCount">
                <img src="/static/img/add.png" alt="">
              </button>
              <input class="number" type="number" v-model="counter">
              <button  class="reduction" v-on:click="remove_i()">
                <img src="/static/img/reduction.png" alt="">
              </button>
            </div>
          </div>
        </div>
        </div>
        <div class="null_div"></div>
        <div class="detail_detail">
          <p>商品详情</p>
          <div class="detailDetail" v-html="goodsDetail.map.detail">
          </div>
        </div>
        <paymoney-view v-on:childByValue="childByValue" :paymoneyMsg="paymoneyMsg" v-if="paymoney"></paymoney-view>
        <paytime-view v-on:childByValue="childByValue"  :paymoneyMsg="paymoneyMsg" v-if="paytime"></paytime-view>
        <dialog-view  :dialogblock="dialogblock"></dialog-view>
        <div class="buy_it">
          <button v-on:click="pay_money" v-if="btnBuy" class="moneyBtn">立即购买</button>
          <button v-else class="timecoin">时间币不足</button>
        </div>
    </div>
  </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {getDetail,getUserInfo} from '../../config/request'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import paymoney from '../dialog/paymoney'
import paytime from '../dialog/paytime'
import mydialog from '../dialog/mydialog'
Vue.component('swiper-view', swiper)
Vue.component('paymoney-view',paymoney)
Vue.component('paytime-view',paytime)
Vue.component('dialog-view',mydialog)

export default {
  name: 'detail',
  components: {
    swiper,
    swiperSlide,
    paymoney,
    paytime,
    mydialog
  },
  data () {
    return {
      childTitleword:'商品详情',
      btnBuy:true,//购买按钮
      dialogblock:{
        flag:false,
        msg:''
      },
      goodsDetail:{
        "imgList": [
          {
            "imgUrl": "",
            "imgRank": 0
          }
        ],
        "map": {
          "unit": "",
          "detail": "",
          "carriage": 0,
          "inventory": 0,
          "suggestPrice": 0,
          "commodityName": "",
          "commodityId": ""
        },
        "addressMap": null,
        "commodityPayType":[],
        "commodityInvoiceType":[]
      },
      counter:1,
      goodsStatus:null,
      paymoney:false,
      paytime:false,
      swiperOption: {
        notNextTick: true,
        // swiper configs 所有的配置同swiper官方api配置
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
          reverseDirection: false,
          waitForTransition: true
        },
        direction: 'horizontal',
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'custom',
          progressbarOpposite: true,
          bulletElement: 'li',
          dynamicBullets: true,
          dynamicMainBullets: 2,
          hideOnClick: false,
          clickable: false,
          renderCustom: function (swiper, current, total) {
            return current + ' / ' + total;
          }
        },
        paginationClickable: true,
        scrollbar: '.swiper-scrollbar',
        mousewheelControl: true,
        observeParents: true,
        debugger: true
      },
      paymoneyMsg:'',
    }
  },
  mounted(){
    console.log("页面初始化")
    console.log(this.$route.params.id)
    console.log(this.$route.params.type)
    this.goodsStatus = this.$route.params.type;
    this.commodityId = this.$route.params.id;
    let type = this.$route.params.type;
    let commodityId = this.$route.params.id
    let uid = this._protypeJs.getUserId()
    let vm = this;

    /**
     * 现金商品
     */
    // vm.goodsDetail = {
    //   "imgList": [
    //     {
    //       "imgUrl": "http://e.hiphotos.baidu.com/image/pic/item/503d269759ee3d6dd17611f84e166d224f4ade55.jpg",
    //       "imgRank": 1
    //     }
    //   ],
    //   "commodityPayType": [
    //     {
    //       "typeName": "微信支付",
    //       "payTypeId": 1
    //     },
    //     {
    //       "typeName": "支付宝支付",
    //       "payTypeId": 2
    //     }
    //   ],
    //   "map": {
    //     "unit": "1件",
    //     "realityPrice": 500,
    //     "detail": "<p class=\"text\" style=\"margin-top: 0px; margin-bottom: 28px; padding: 0px; word-wrap: break-word; font-family: &quot;Microsoft Yahei&quot;, Helvetica, sans-serif; white-space: normal; background-color: rgb(255, 255, 255); text-indent: 2em;\">\r\n    <span style=\"color: rgb(255, 0, 0);\">在Wear OS智能手表上</span>，你现在可以通过向左滑动来查看这些目标，以及你的其他活动。在那里，新的界面有类似Apple Watch的活动环。你也可以从这个屏幕开始记录锻炼。\r\n</p>\r\n<p class=\"text\" style=\"margin-top: 0px; margin-bottom: 28px; padding: 0px; word-wrap: break-word; font-family: &quot;Microsoft Yahei&quot;, Helvetica, sans-serif; white-space: normal; background-color: rgb(255, 255, 255); text-indent: 2em;\">\r\n    <strong>通知更容易查看和删除</strong>\r\n</p>\r\n<p class=\"text\" style=\"margin-top: 0px; margin-bottom: 28px; padding: 0px; word-wrap: break-word; font-family: &quot;Microsoft Yahei&quot;, Helvetica, sans-serif; white-space: normal; background-color: rgb(255, 255, 255); text-indent: 2em;\">\r\n    <br/>\r\n</p>\r\n<p style=\"margin-top: 0px; margin-bottom: 28px; padding: 0px; word-wrap: break-word; font-family: &quot;Microsoft Yahei&quot;, Helvetica, sans-serif; white-space: normal; background-color: rgb(255, 255, 255);\">\r\n    <img src=\"http://inews.gtimg.com/newsapp_bt/0/5053748004/641\"/>\r\n</p>\r\n<p style=\"margin-top: 0px; margin-bottom: 28px; padding: 0px; word-wrap: break-word; font-family: &quot;Microsoft Yahei&quot;, Helvetica, sans-serif; white-space: normal; background-color: rgb(255, 255, 255);\">\r\n    <br/>\r\n</p>\r\n<p class=\"text\" style=\"margin-top: 0px; margin-bottom: 28px; padding: 0px; word-wrap: break-word; font-family: &quot;Microsoft Yahei&quot;, Helvetica, sans-serif; white-space: normal; background-color: rgb(255, 255, 255); text-indent: 2em;\">\r\n    谷歌重新设计了Wear OS上的通知屏幕。它不仅看起来更美观，而且更容易一次查看更多的通知，并删除你已经看过的通知。\r\n</p>\r\n<p>\r\n    <br/>\r\n</p>",
    //     "suggestPrice": 600,
    //     "inventory": 0,
    //     "carriage": 20,
    //     "commodityName": "人民币商品12",
    //     "commodityId": "RMBshanpin12"
    //   },
    // "commodityInvoiceType": [
    //   {
    //     "typeName": "普通发票",
    //     "typeId": 1
    //   },
    //   {
    //     "typeName": "增值税专用发票",
    //     "typeId": 2
    //   }
    // ],
    //   "addressMap": null
    // };

    /**
     * 时间币商品
     */
    // vm.goodsDetail = {
    //   "imgList": [
    //     {
    //       "imgUrl": "http://g.hiphotos.baidu.com/image/pic/item/bd3eb13533fa828b189d4ddaf01f4134970a5a49.jpg",
    //       "imgRank": 1
    //     }
    //   ],
    //   "commodityPayType": [
    //     {
    //       "typeName": "微信支付",
    //       "payTypeId": 1
    //     },
    //     {
    //       "typeName": "支付宝支付",
    //       "payTypeId": 2
    //     }
    //   ],
    //   "map": {
    //     "unit": "1台",
    //     "detail": "<p style=\"margin-top: 0px; margin-bottom: 25px; padding: 0px; text-indent: 28px; font-size: 14px; text-align: justify; word-wrap: break-word; word-break: normal; color: rgb(43, 43, 43); font-family: simsun, arial, helvetica, clean, sans-serif; white-space: normal; background-color: rgb(255, 255, 255);\">\r\n    <span style=\"color: rgb(255, 0, 0);\">8月29日，日本东京大学等机构研究团队综合利用超高速荧光成像技术、超高速数据处理技术、微流体技术等跨领域技术，研发了这一名为“智能影像激活细胞分析仪”的设备。它能借助人工智</span>能的深度学习能力对细胞图像进行分析，以每秒约100个的高速识别细胞，并根据分析结果筛取目标细胞。\r\n</p>\r\n<p style=\"margin-top: 0px; margin-bottom: 25px; padding: 0px; text-indent: 28px; font-size: 14px; text-align: justify; word-wrap: break-word; word-break: normal; color: rgb(43, 43, 43); font-family: simsun, arial, helvetica, clean, sans-serif; white-space: normal; background-color: rgb(255, 255, 255);\">\r\n    <img src=\"http://p0.ifengimg.com/pmop/2018/0830/4103F66239DAD193BFE810DDB773E2E6B6084BDD_size63_w580_h379.jpeg\"/>\r\n</p>\r\n<p style=\"margin-top: 0px; margin-bottom: 25px; padding: 0px; text-indent: 28px; font-size: 14px; text-align: justify; word-wrap: break-word; word-break: normal; color: rgb(43, 43, 43); font-family: simsun, arial, helvetica, clean, sans-serif; white-space: normal; background-color: rgb(255, 255, 255);\">\r\n    ●1992年，美国国家航空航天局推出一项搜寻地外文明（SETI）的项目，并建造了两个巨大的射电望远镜，用来在夜空中搜寻宇宙深处可能来自于外星文明的信号，或者，地外文明所使用的技术痕迹。然而一年后，项目终止。前不久，美国众议院通过的一项新的法案——时隔25年后，美国国会准备给NASA拨款1000万美元（约6345万人民币），让其重启搜寻地外文明计划。\r\n</p>\r\n<p>\r\n    <br/>\r\n</p>",
    //     "timecoinPrice": 500,
    //     "suggestPrice": 600,
    //     "carriage": 100,
    //     "inventory": 4500,
    //     "commodityName": "时间币商品4",
    //     "commodityId": "timeShanpin04"
    //   },
    //   "commodityInvoiceType": null,
    //   "addressMap": null
    // }
    if(type === '2' && (vm.goodsDetail.map.timecoinPrice)/100 > window.localStorage.getItem('availableCoin')){
      this.btnBuy = false
    }
    getDetail(type,commodityId,uid).then(res =>{
      console.log(JSON.stringify(res));
      if(type === '2' && (res.map.timecoinPrice)/100 > window.localStorage.getItem('availableCoin')){
        this.btnBuy = false
      }
      vm.goodsDetail = res
    });
  },
  methods:{
    addCount(){
      this.counter = this.counter+1;
      if(this.goodsStatus === '2'){
        if((this.counter)*((this.goodsDetail.map.timecoinPrice)/100) > window.localStorage.getItem('availableCoin')){
          this.btnBuy = false
        }
      }
    },
    remove_i:function () {
      let count = this.counter
      console.log(count);
      if(count > 0){
        this.counter = count-1;
        if(this.goodsStatus === '2'){
          if(parseInt((this.counter)*((this.goodsDetail.map.timecoinPrice)/100)) <= parseInt(window.localStorage.getItem('availableCoin'))){
            this.btnBuy = true
          }else {
            this.btnBuy = false
          }
        }
      }
    },
    pay_money:function () {
      if(!this.goodsDetail.addressMap){
        this.dialogblock = {
          flag:true,
          msg:'请填写收货地址'
        }
      }else {
        this._protypeJs.addBodyHeight();
        let commodityPayType = this.goodsDetail.commodityPayType;
        if(commodityPayType){
          for (var i =0;i<commodityPayType.length;i++){
            if(i === 0){
              commodityPayType[i].flag = true
            }else {
              commodityPayType[i].flag = false
            }
          }
          window.localStorage.setItem('commodityPayType',JSON.stringify(commodityPayType))//支付方式列表
        }

        let commodityInvoiceType = this.goodsDetail.commodityInvoiceType;
        if(commodityInvoiceType){
          for (var i =0;i<commodityInvoiceType.length;i++){
            if(i === 0){
              commodityInvoiceType[i].flag = true
            }else {
              commodityInvoiceType[i].flag = false
            }
          }
          window.localStorage.setItem('commodityInvoiceType',JSON.stringify(this.goodsDetail.commodityInvoiceType))//发票类型列表
        }

        if(this.goodsStatus == 1){//人民币商品
          let obj = {
            msg:{
              distributionChannel:this.goodsStatus,//商品类型
              commodityId:this.commodityId,//商品ID
              uid:this._protypeJs.getUserId(),//用户ID
              count:this.counter, //购买数量
              receivingName:this.goodsDetail.addressMap.shippingName,//收货人姓名
              receivingPhone:this.goodsDetail.addressMap.shippingPhone,//收货人姓名
              receivingAddress:this.goodsDetail.addressMap.shippingAddress + this.goodsDetail.addressMap.detailAddress,//收货地址
              carriage:(this.goodsDetail.map.carriage)/100,//运费
              realityPrice:(this.goodsDetail.map.realityPrice)/100,//单价
            },
          };
          this.paymoneyMsg = obj;
          this.paymoney = true;
        }else if( this.goodsStatus == 2){//时间币商品
            if(this.goodsDetail.map.carriage !== 0){//运费不为0
              let obj = {
                msg:{
                  distributionChannel:this.goodsStatus,//商品类型
                  commodityId:this.commodityId,//商品ID
                  uid:this._protypeJs.getUserId(),//用户ID
                  count:this.counter, //购买数量
                  receivingName:this.goodsDetail.addressMap.shippingName,//收货人姓名
                  receivingPhone:this.goodsDetail.addressMap.shippingPhone,//收货人姓名
                  receivingAddress:this.goodsDetail.addressMap.shippingAddress + this.goodsDetail.addressMap.detailAddress,//收货地址
                  carriage:(this.goodsDetail.map.carriage)/100,//运费
                  timecoinPrice:(this.goodsDetail.map.timecoinPrice)/100,//单价
                },
              };
              this.paymoneyMsg = obj;
              this.paymoney = true;
            }else {//免运费
              let obj = {
                msg:{
                  distributionChannel:this.goodsStatus,//商品类型
                  commodityId:this.commodityId,//商品ID
                  uid:this._protypeJs.getUserId(),//用户ID
                  count:this.counter, //购买数量
                  receivingName:this.goodsDetail.addressMap.shippingName,//收货人姓名
                  receivingPhone:this.goodsDetail.addressMap.shippingPhone,//收货人姓名
                  receivingAddress:this.goodsDetail.addressMap.shippingAddress + this.goodsDetail.addressMap.detailAddress,//收货地址
                  timecoinPrice:(this.goodsDetail.map.timecoinPrice)/100,//单价
                },
              };
              this.paymoneyMsg = obj;
              this.paytime = true;
            }
        }
      }
    },
    childByValue:function (childByValue) {
      this._protypeJs.removeBodyHeight();
      console.log("childByValue:"+childByValue)
      this.paymoney = childByValue
      this.paytime = childByValue
    },
    /**
     * 获取用户时间币
     */
    getUserTime(){
      getUserInfo(this._protypeJs.getUserId())
        .then(res => {
          console.log(res);
          return this.availableCoin;
          // this.availableCoin = res.availableCoin;
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 添加收货地址
     */
    addAdress:function () {
      this.$router.push('/add/myaddress');
    }
  },
}
</script>
<style>
  .detailDetail>p{
    width: 100%;
    height: 100%;
    /*overflow: hidden;*/
  }
  .detailDetail img{
    width: 100%;
    height: 100%;
    display: block;
    margin: auto;
  }
</style>
<style scoped>
.time_icon{
  position: absolute;
  top: 0px;
}
  .block{
    display: block;
  }
  .none{
    display: none;
  }
  .detail{
    /*font-size: 13px;*/
  }
  .buy_it{
    position: fixed;
    bottom: 0;
    width: 100%;
    margin: auto;
    padding-bottom: 10px;
    padding-top: 10px;
    background-color: white;
  }
  .buy_it .timecoin{
    background-color: grey;
    color: white;
    height: 45px;
    width: 90%;
    border-radius:30px;
    border: none;
    font-size: 16px;
  }
.buy_it .moneyBtn{
  background-color: #ea3339;
  color: white;
  height: 45px;
  width: 90%;
  border-radius:30px;
  border: none;
  font-size: 16px;
}
  .detail_detail{
    width: 95%;
    margin: auto;
    text-align: left;
    padding-bottom: 55px;
  }
  .detail_detail p:first-child{
    font-size: 14px;
    font-weight: 600;
  }
  .last_count{
    margin-top: 10px;
  }
  .right_count{
    width: 124px;
    height: 40px;
    float: right;
  }
  .right_count img{
    width: 20px;
    margin-top: 5px;
    margin-left: -5px;
  }
  .add_count{
    /*border: 1px solid red;*/
    float: right;
    background-color: #f5f5f5;
    margin-left: 3px;
    width: 33px;
    height: 30px;
    border: none;
  }
  .number{
    float: right;
    width: 38px;
    height: 30px;
    margin-left: 3px;
    border: none;
    background-color: #f5f5f5;
    text-align: center;
  }
  .reduction{
    /*border: 1px solid black;*/
    float: right;
    margin-left: 3px;
    background-color: #f5f5f5;
    width: 33px;
    border: none;
    height: 30px;
  }
  .adress_detail_all{
    width: 95%;
    margin: auto;
  }
  .adress_detail{
    display: flex;
  }
  .adress_detail p{
    margin: 0;
    padding: 0;
  }
  .adress_tel{
    margin-left: 15px;
  }
  .adress_relative{
    position: relative;
    height: 18px;
    line-height: 18px;
  }
  .adress_relative>img{
    position: absolute;
    left: 0;
    top: 1.5px;
  }
  .adress_relative > label{
    margin-left: 19px;
  }
  .word_moren{
    margin: 0;
    font-size: 13px;
    padding-top: 10px;
    color: #9b9b9b;
  }
  .adress_detail p:first-child{
    padding: 10px 0;
  }
  .adress_detail p img{
    width: 15px;
  }
  .right_img{
    float: right;
  }
  .adress_left{
    flex: 1;
  }
  .adress_right{
    flex: 9;
    text-align: left;
    padding-left: 19px;
  }
  .title_j{
    width: 95%;
    margin: auto;
  }
  .detail_tatle{
    margin: 0;
    padding: 0;
    font-size: 15px;
    text-align: left;
    margin-top: 15px;
    position: relative;
  }
  .detail_hot{
    color: white;
    background-color: #ec414d;
    border-radius: 12px;
    font-size: 9px;
    padding: 0px 5px;
    position: absolute;
    left: 0;
    top: 3px;
  }
  .word_hot{
    font-weight: 600;
    margin-left: 35px;
  }
  .detail_money{
    margin: 0;
    text-align: left;
    margin-top: 13px;
    margin-bottom: 15px;
    /*padding: 10px 0;*/
    height: 20px;
    line-height: 20px;
    position: relative;
  }
  .money_real{
    color: #ec414d;
    font-weight: 600;
    font-size: 18px;
  }
  .fontM{
    font-size: 11px;
  }
  .fontM_i{
    font-size: 10px;
  }
  .money_over{
    margin-left: 15px;
    font-size: 14px;
    color: #9b9b9b;
    text-decoration:line-through;
  }
  .money_over_count{
    font-size: 13px;
    color: #9b9b9b;
    float: right;
    margin-top: 5px;
  }
  .null_div{
    height: 10px;
    width: 100%;
    background-color: #f8f8f8;
  }
  /**
  **轮播图
   */
  .swiper-pagination>.swiper-pagination-bullet-active{
    background-color: grey;
  }
  .title_i{
    position: relative;
  }
  .detail_img{
    width: 100%;
  }
  #my_pa{
    position: absolute;
    color: black;
    bottom: 10px;
    left: 0;
    right: 0;
    text-align: center;
    margin: auto;
  }
</style>
