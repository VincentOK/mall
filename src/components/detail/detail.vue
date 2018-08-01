<!--商品详情-->
<template>
  <div class="detail">
    <div class="title_i">
      <swiper :options="swiperOption">
        <swiper-slide><img class="detail_img" src="/static/img/a1.jpg"></swiper-slide>
        <swiper-slide><img  class="detail_img" src="/static/img/a1.jpg"></swiper-slide>
        <swiper-slide><img  class="detail_img" src="/static/img/a1.jpg"></swiper-slide>
        <swiper-slide><img class="detail_img"  src="/static/img/a1.jpg"></swiper-slide>
      </swiper>
      <div class="swiper-pagination" id="my_pa" slot="pagination"></div>
    </div>
    <div class="title_j">
      <p class="detail_tatle">
        <label class="detail_hot">热门</label>
        <label class="word_hot">越南美女包邮越南美女包邮越南美女包邮越南美女包邮越南美女包邮越南美女包邮越南美女包邮</label>
      </p>
      <p class="detail_money">
        <label class="money_real">￥60.00</label>
        <label class="money_over">￥33.00</label>
        <label class="money_over_count">剩余99件</label>
      </p>
    </div>
    <div class="null_div"></div>
    <div class="adress_detail_all">
      <div class="adress_detail">
        <div class="adress_left">
          <p class="word_moren">送至</p>
        </div>
        <div class="adress_right" v-on:click="addAdress">
          <p><label>Vincent</label><label class="adress_tel">18376614866</label><img class="right_img" src="/static/img/right.png" alt=""></p>
          <p><img src="/static/img/address.png" alt=""><label>广东省深圳市南山区田厦金牛广场1402</label></p>
        </div>
      </div>
      <div class="adress_detail">
        <div class="adress_left">
          <p class="word_moren">规格</p>
        </div>
        <div class="adress_right">
          <p>每份300克</p>
        </div>
      </div>
      <div class="adress_detail">
        <div class="adress_left">
          <p class="word_moren">运费</p>
        </div>
        <div class="adress_right">
          <p>包邮</p>
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
          <div class="add_count" v-on:click="counter += 1">
            <img src="/static/img/add.png" alt="">
          </div>
          <input class="number" type="number" v-model="counter">
          <div  class="reduction" v-on:click="remove_i()">
            <img src="/static/img/reduction.png" alt="">
          </div>
        </div>
      </div>
    </div>
    </div>
    <div class="null_div"></div>
    <div class="detail_detail">
      <p>商品详情</p>
      <p>
        商品详情商品详情商品详情商品详情商品详情商品详情商品详情商品详情商品
        详情商品详情商品详情商品详情商品详情商品详情商品详情
        商品详情商品详情商品详情商品详情商品详情商品详情商品详情商品详情商品
        详情商品详情商品详情商品详情商品详情商品详情商品详情
      </p>
    </div>
    <paymoney-view v-on:childByValue="childByValue" v-if="paymoney"></paymoney-view>
    <paytime-view v-on:childByValue="childByValue" v-if="paytime"></paytime-view>
    <div class="buy_it">
      <button v-on:click="pay_money">立即购买</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
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
      counter:1,
      goodsStatus:0,
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
          type: 'bullets',
          progressbarOpposite: true,
          bulletElement: 'li',
          dynamicBullets: true,
          dynamicMainBullets: 2,
          hideOnClick: true,
          clickable: true
        },
        paginationClickable: true,
        scrollbar: '.swiper-scrollbar',
        mousewheelControl: true,
        observeParents: true,
        debugger: true
      }
    }
  },
  mounted(){
    console.log("页面初始化")
  },
  methods:{
    remove_i:function () {
      let count = this.counter
      if(count > 0){
        this.counter = count-1
      }
    },
    pay_money:function () {
      if(this.goodsStatus == 0){
        this.paymoney = true;
      }else {
        this.paytime = true;
      }
    },
    childByValue:function (childByValue) {
      this.paymoney = childByValue
      this.paytime = childByValue
    },
    addAdress:function () {
      this.$router.push('/add/myaddress');
    }
  }
}
</script>

<style scoped>
  .detail{
    /*font-size: 13px;*/
  }
  .buy_it{
    position: fixed;
    bottom: 10px;
    width: 95%;
    margin: auto;
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
    width: 110px;
    height: 40px;
    float: right;
  }
  .right_count img{
    width: 20px;
    margin-top: 5px;
    margin-left: 5px;
  }
  .add_count{
    float: right;
    background-color: #f5f5f5;
    margin-left: 3px;
    width: 30px;
    height: 30px;
  }
  .number{
    float: right;
    width: 30px;
    height: 25px;
    margin-left: 3px;
    background-color: #f5f5f5;
    text-align: center;
  }
  .reduction{
    float: right;
    margin-left: 3px;
    background-color: #f5f5f5;
    width: 30px;
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
  .word_moren{
    margin: 0;
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
  }
  .detail_hot{
    color: white;
    background-color: #ec414d;
    border-radius: 8px;
    font-size: 12px;
    padding: 3px 5px;
  }
  .word_hot{
    font-weight: 600;
  }
  .detail_money{
    margin: 0;
    text-align: left;
    padding: 10px 0;
  }
  .money_real{
    color: #ec414d;
    font-weight: 600;
    font-size: 17px;
  }
  .money_over{
    font-size: 15px;
    color: #9b9b9b;
    text-decoration:line-through;
  }
  .money_over_count{
    font-size: 15px;
    color: #9b9b9b;
    float: right;
    margin-top: 5px;
  }
  .null_div{
    height: 10px;
    width: 100%;
    background-color: #f4f4f4;
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
    height: 200px;
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
