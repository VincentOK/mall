<template>
  <div>
  <shoptitle :childTitleword="childTitleword"></shoptitle>
  <div class="conent_all_h5" v-touch:swiperight="_protypeJs.touchRight">
    <ul class="tabs">
      <li class="li-tab" v-for="(item,index) in tabsParam"
          @click="toggleTabs(index)"
          :class="{active:index == nowIndex}">{{item}}</li>
    </ul>
    <div class="divTab" v-show="nowIndex===0">
      <refundlist-view :refund_status="nowIndex"></refundlist-view>
    </div>
    <div class="divTab" v-show="nowIndex===1">
      <refundlist-view :refund_status="nowIndex"></refundlist-view>

    </div>
    <div class="divTab" v-show="nowIndex===2">
      <refundlist-view :refund_status="nowIndex"></refundlist-view>
    </div>
    <div class="divTab" v-show="nowIndex===3">
      <refundlist-view :refund_status="nowIndex"></refundlist-view>
    </div>
  </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import refundlist from './refundlist'
  Vue.component('refundlist-view',refundlist)

    export default {
        name: "myorder",
      comments:{
          refundlist,
      },
        data(){
          return{
            childTitleword:'我的订单',
            tabsParam:['全部','待收货','已完成','已取消'],//（这个也可以用对象key，value来实现）
            nowIndex:0,//默认第一个tab为激活状态
            refundDialog:false
          }
        },
      mounted(){
        console.log("123")
      },
      methods:{
        toggleTabs:function(index){
          this.nowIndex=index;
        },
      }
    }
</script>

<style scoped>
  .active{
    color: #f10215;
    border-bottom: 2px solid #f10215;
  }
  .tabs{
    background-color: white;
    width: 100%;
    margin: 0;
    padding:0;
    height: 44px;
    line-height: 44px;
    font-size: 15px;
    border-bottom: 1px solid #eeeeee;
    border-top: 1px solid #eeeeee;
    position: fixed;
    top: 40px;
    z-index: 9999999;
  }
  .li-tab{
    width: 25%;
    height: 100%;
    display:inline-block;
    text-align: center;
  }
  .divTab{
    margin-top: 85px;
  }
</style>
