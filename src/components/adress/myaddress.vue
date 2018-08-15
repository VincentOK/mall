<!--添加收货地址-->
<template>
  <div>

    <shoptitle v-bind:childTitleword="childTitleword"></shoptitle>
    <div class="conent_all_h5 heightAuto" v-touch:swiperight="_protypeJs.touchRight">
      <div class="address_one">
        <div class="address_left">
          收货人：
        </div>
        <div class="address_right">
          <input class="adress_name" type="text" v-model="adressName">
        </div>
      </div>
      <div class="address_one">
        <div class="address_left">
          手机号码：
        </div>
        <div class="address_right">
          <input class="adress_name" maxlength="11" type="tel"  onkeyup="this.value=(this.value.match(/\d+(\.\d{0,2})?/)||[''])[0];" v-model="phone">
          <img class="delete_tel" v-on:click="clearPhone" src="/static/img/delete.png" alt="">
        </div>
      </div>
      <div class="address_one">
        <div class="address_left">
          所在地区：
        </div>
        <div class="address_right" v-on:click="showCitypos">
          {{address.Province}}&nbsp;&nbsp; {{address.City}}&nbsp;&nbsp; {{address.District}}
        </div>
      </div>
      <div class="address_one">
        <div class="address_left" style="line-height: 2">
          详细地址：
        </div>
        <div class="address_right">
          <textarea class="adress_name" type="text" v-model="detailAdress"></textarea>
        </div>
      </div>

      <dialog-view  :dialogblock="dialogblock"></dialog-view>
      <city-view :cityStatus="cityStatus" v-on:getAddress="getAddress"></city-view>
      <div class="address_save">
        <button v-on:click="saveAdress">保存</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { _check } from '../../commonJS/commonCheck'
  import city from './city'
  import mydialog from '../dialog/mydialog'
  Vue.component('city-view',city)
  Vue.component('dialog-view',mydialog)
  export default {
    name: 'myaddress',
    data(){
      return{
        childTitleword:'收货地址',
        cityStatus:false,
        dialogblock:{
          flag:false,
          msg:''
        },
        adressName:'',
        address:'',
        phone:'18376614866',
        detailAdress:''
      }
    },
    comments:{
      city,
      mydialog
    },
    computed:{
    },
    mounted(){
      // this.checkPhone()
    },
    methods:{
      showCitypos:function () {
        if(this.cityStatus){
          this.cityStatus = false
        }else{
          this.cityStatus = true
        }
      },
      clearPhone:function(){
        this.phone = null
      },
      getAddress:function (childByValue) {
        console.log("选择的地址"+childByValue)
        this.address = childByValue
      },
      saveAdress:function () {
        console.log("保存地址")
        var adressNameFlag = this.adressName;//收货人姓名
        var phoneFlag = this.phone;//收货人手机号码
        var adressFlag = this.address;//收货人地址
        var detailAdressFlag = this.detailAdress;//收货人详细地址
        if(adressNameFlag && phoneFlag && adressFlag && detailAdressFlag){
          console.log("全部填写")
          console.log(_check.checkName(this.adressName))
          console.log(_check.checkPhone(this.phone))
          if(!_check.checkName(this.adressName)){
            this.dialogblock = {
              flag:true,
              msg:'收货人姓名有误'
            };
          }else if(!_check.checkPhone(this.phone)){
            this.dialogblock = {
              flag:true,
              msg:'手机号码不正确'
            };
          }else {
            //请求服务端
            alert("请求服务端")
            this.$router.go(-1);//返回上一层
          }
        }else {
          console.log("信息未填完")
          this.dialogblock = {
            flag:true,
            msg:'信息未填完'
          };
        }
      },
  }
  }
</script>

<style scoped>
.address_one{
  display: flex;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #f4f4f4;
}
.delete_tel{
  width: 20px;
  position: absolute;
  right: 10px;
  top: 15px;
}
  .address_left{
    flex: 2;
    color: #9b9b9b;
  }
  .address_right{
    flex: 5;
    text-align: left;
    position: relative;
  }
  .adress_name{
    width: 85%;
    height: 45px;
    /*line-height: 45px;*/
    border: none;
    outline:none;
  }
.address_save{
  position: fixed;
  bottom: 10px;
  width: 95%;
  margin-left: 2.5%;
}
.address_save button{
  background-color: #ea3339;
  color: white;
  height: 45px;
  width: 90%;
  border-radius:30px;
  border: none;
  font-size: 16px;
}
  /**
  **省市联动
   */
</style>
