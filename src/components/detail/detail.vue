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
              {{goodsDetail.map.realityPrice}}
            </label>
            <label class="money_real"  v-if="goodsDetail.map.timecoinPrice">
              <label class="fontM">时间币</label>
              {{goodsDetail.map.timecoinPrice}}
            </label>
            <label class="money_over"   v-if="goodsDetail.map.suggest_price"><label class="fontM_i">￥</label>{{goodsDetail.map.suggestPrice}}</label>
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
              <p><label>{{goodsDetail.addressMap.shippingName}}</label><label class="adress_tel">{{goodsDetail.addressMap.shippingPhone}}</label><img class="right_img" src="/static/img/right.png" alt=""></p>
              <p class="adress_relative"><img  v-if="goodsDetail.addressMap.shippingAddress" src="/static/img/address.png" alt=""><label>{{goodsDetail.addressMap.shippingAddress}}&nbsp;&nbsp;{{goodsDetail.addressMap.detailAddress}}</label></p>
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
              <p v-else>{{goodsDetail.map.carriage}}</p>
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
              <button class="add_count" v-on:click="counter ++">
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
        <div class="buy_it">
          <button v-on:click="pay_money" >立即购买</button>
        </div>
    </div>
  </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {getDetail} from '../../config/request'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import paymoney from '../dialog/paymoney'
import paytime from '../dialog/paytime'
Vue.component('swiper-view', swiper)
Vue.component('paymoney-view',paymoney)
Vue.component('paytime-view',paytime)
export default {
  name: 'detail',
  components: {
    swiper,
    swiperSlide,
    paymoney,
    paytime
  },
  data () {
    return {
      childTitleword:'商品详情',
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
        "addressMap": {
        }
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
    let type = this.$route.params.type
    let commodityId = this.$route.params.id
    let uid = this._protypeJs.getUserId()
    let vm = this
    getDetail(type,commodityId,uid).then(res =>{
      console.log(JSON.stringify(res))
      vm.goodsDetail = res
    })
  },
  methods:{
    remove_i:function () {
      let count = this.counter
      console.log(count)
      if(count > 0){
        this.counter = count-1
      }
    },
    pay_money:function () {
      this._protypeJs.addBodyHeight();
      let obj = {
        goodsStatus:this.goodsStatus,//商品类型
        commodityId:this.commodityId,//商品ID
        uid:this._protypeJs.getUserId(),//用户ID
        count:this.counter//购买数量
      }
      this.paymoneyMsg = obj;
      if(this.goodsStatus == 1){
        this.paymoney = true;
      }else {
        this.paytime = true;
      }
    },
    childByValue:function (childByValue) {
      this._protypeJs.removeBodyHeight();
      console.log("childByValue:"+childByValue)
      this.paymoney = childByValue
      this.paytime = childByValue
    },
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
  .buy_it button{
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
