<!--退款首页-->
<template>
  <div>
    <shoptitle :childTitleword="childTitleword"></shoptitle>

  <div class="conent_all_h5" v-touch:swiperight="_protypeJs.touchRight">
    <!--<title-view :commodityId="commodityId"></title-view>-->
    <div class="refund_all">
      <div class="refund_title">
        <p>退款方式</p>
        <p class="refund_word_i">
          <label class="refund_border">原支付返还</label>
          <label class="refund_word">(兑换或购买时支付的时间币恕不退还)</label>
        </p>
      </div>
    </div>
    <div class="refund_all">
      <div class="refund_title">
        <p class="choose">
          <label>申请原因</label>
          <label class="refund_choose" v-on:click="whyNot">
            <label class="choose_word">{{whynot_reason.msg}}</label>
            <img class="choose_img" v-bind:class="choose_right=='choose_right_i' ? 'choose_right_i' : ''" src="/static/img/chooseSelect.png" alt="">
          </label>
        </p>
      </div>
    </div>
    <div class="refund_question">
      <p>问题描述</p>
    </div>
    <div class="question_des">
      <textarea class="desciption" placeholder="请您在此描述问题...." v-bind:maxlength="500" @input="descArea" v-model="introduct" name="abstract" id="abstract"></textarea>
      <p class="word_last">{{Surplus}}/500&nbsp;&nbsp;&nbsp;</p>
    </div>
    <div  v-if="imgList.length !=0">
      <p class="border_p">
        <img src="/static/img/colorborder.png" class="border_color" alt="">
      </p>
      <div class="myphoto">
        <div class="myphoto_one" v-for="(item,index) in imgList" :key="index">
          <img class="close_photo" v-on:click="closePhoto(index)" src="/static/img/close_photo.png" alt="">
          <img class="my_img" v-bind:src="item" alt="">
        </div>
      </div>
    </div>
    <div class="question_des">
      <p class="photo">
        <input type="file" v-if="imgList.length <5"  id="file_input" v-on:click="change" accept="image/*" capture="camera">
        <!--<button v-if="imgList.length <5"  id="file_input" v-on:click="changeOne"></button>-->
        <img :src="imgList.length <5 ? '/static/img/choosePhoto.png' : '/static/img/choosePhotoLast.png'" alt="">
      </p>
    </div>
    <div class="null_div"></div>
    <div class="refund_all" style="border-bottom: 0px">
      <div class="refund_title">
        <p>商品退回方式</p>
        <p class="refund_word_i">
          <label class="refund_border">快递至商品供应商</label>
          <label class="refund_word">(为维护您的权益，运单上请注明快递费用)</label>
        </p>
        <p class="font_color">
          商品寄回地址将在审核通过后一短信形式告知。用户需自行垫付快递费。成功退款后若需申请退还该快递费，
          请再次到本页面顶部申请。
        </p>
      </div>
    </div>
    <div class="null_div"></div>
    <div class="refund_all">
      <div class="refund_tel">
        <p>
          <label>联系人:</label>
          <input type="text" v-model="myname">
        </p>
      </div>
    </div>
    <div class="refund_all">
      <div class="refund_tel">
        <p>
          <label>联系电话:</label>
          <input maxlength="11" type="tel"  onkeyup="this.value=(this.value.match(/\d+(\.\d{0,2})?/)||[''])[0];" v-model="myphone">
        </p>
      </div>
    </div>
    <p class="word_i_refund font_color">提交服务单后，售后专员可能与您电话沟通，请保持手机通畅</p>
    <div>
      <button class="refund_sub" v-on:click="saveAddress">提交</button>
    </div>

    <dialog-view  :dialogblock="dialogblock"></dialog-view>
    <whynotwant-view v-on:getWhynot="getWhynot" v-if="whynot"></whynotwant-view>
  </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import { _check } from '../../commonJS/commonCheck'
  import { uploadBlobImg, addRedund} from '../../config/request'
  import title from './refund_title'
  import mydialog from '../dialog/mydialog'
  import whynotwant from './whynotwant'
  Vue.component('title-view',title)
  Vue.component('whynotwant-view',whynotwant)
  Vue.component('dialog-view',mydialog)
    export default {
        name: "refundindex",
        comments:{
          whynotwant,
          mydialog,
          title
        },
      data(){
          return{
            childTitleword:'申请退款',
            commodityId:'',//商品id
            orderNumber:'',//订单id
            whynot:false,
            dialogblock:{
              flag:false,
              msg:''
            },
            whynot_reason:{
              id:'',
              msg:'未选择'
            },
            myname:'',
            myphone:'',
            choose_right:'choose_right_i',
            Surplus:500,
            introduct:'',
            imgList:[],
          }
      },
      mounted(){
        this.commodityId = this.$route.params.commodityId;
        this.orderNumber = this.$route.params.orderNumber;
        /**
         * 抛出函数到window对象，方便app端调用
         * @param str
         */
        window['photoFiles'] = (str) => {
          this.myPhotoFiles(str);
        }
      },
      methods:{
        /**
         * 相册
         */
        myPhotoFiles(str){
          alert("android调用JS函数")
          alert("返回图片信息："+str)
        },
        changeOne:function(){
          alert(11);
          this._protypeJs.appGetFiles();
        },


        change:function (){
          let vm = this;
          if(vm.imgList.length <5){
            let imginput = document.getElementById("file_input");
            imginput.onchange = function () {
              let files = this.files;
              console.log("========="+files)
              let url = URL.createObjectURL(files[0]);
              console.log(url)
              let filesName = files[0];
              console.log(filesName);
              let param = new FormData(); // 创建form对象
              param.append('files', filesName, filesName.name);  // 通过append向form对象添加数据
              uploadBlobImg(param).then(res =>{
                console.log("上传成功："+res);
                let length = vm.imgList.length;
                console.log(length);
                if(length < 5){
                 alert("上传成功相册路径："+res.target);
                  vm.imgList.push(res.target)
                }
              }).catch(err =>{
                console.log(err)
              })
            }
          }
        },
        closePhoto:function(index){
          this.imgList.splice(index,1);
        },
        whyNot:function () {
          this.whynot = true
        },
        getWhynot:function (getWhynot) {
          if (typeof getWhynot === 'boolean') {
            this.whynot = false
          }else {
            this.whynot = false
            this.choose_right = ''
            this.whynot_reason = getWhynot
          }
        },
        descArea:function(){
          var textVal = this.introduct.length;
          this.Surplus = 500 - textVal;
        },
        saveAddress:function () {
          let uid = this._protypeJs.getUserId();//用户id
          let commodityId = this.commodityId;//商品id
          let orderNumber = this.orderNumber;//订单号
          let desc = this.introduct;//描述
          let name = this.myname;//联系人
          let phone = this.myphone;//联系电话
          let filesImg = this.imgList;//图片files对象数组

          let strImgList = '';
          for (var i =0;i< filesImg.length;i++){
            if(strImgList != ''){
              strImgList = strImgList + ',' + filesImg[i]
            }else {
              strImgList = filesImg[i]
            }
          }
          console.log('aaaaaaaaaaa:'+JSON.stringify(filesImg))
          console.log('str:'+strImgList)
          let reason = this.whynot_reason.msg;
          console.log("请求参数："+'=用户id='+uid+'=商品id='+commodityId+'=订单号='+orderNumber+'=图片数组='+filesImg+'=描述='+desc+'=联系人='+name+'=联系电话='+phone)
          if(desc && name && phone && reason != '未选择'){
            if(reason == '未选择'){
              this.dialogblock = {
                flag:true,
                msg:'请选择退货原因'
              };
              return false
            }else if(!_check.checkName(name)){
              this.dialogblock = {
                flag:true,
                msg:'收货人姓名有误'
              };
              return false
            }else if(!_check.checkPhone(phone)){
              this.dialogblock = {
                flag:true,
                msg:'手机号码不正确'
              };
              return false
            }else {
              //请求服务端
              // alert("请求服务端提交申请")
              console.log(filesImg)
              addRedund(uid,orderNumber,commodityId,reason,desc,strImgList,name,phone).then(res =>{
                console.log("确认提交申请："+JSON.stringify(res))
                if(res){
                  this.$router.go(-1);//返回上一层
                }
              }).catch(err =>{
                console.log("err："+JSON.stringify(err))
              })
            }
          }else {
            console.log("信息未填完")
            this.dialogblock = {
              flag:true,
              msg:'信息未填完'
            };
          }
        }
      }
    }
</script>

<style scoped>
  #file_input{
    background-color: white;
    border: none;
  }
  .myphoto{
    width: 80%;
    height: 80px;
    margin: auto;
  }
  .myphoto_one{
   position: relative;
    width: 50px;
    height: 50px;
    float: left;
    margin-top: 15px;
    margin-left: 5px;
    margin-right: 5px;
  }
  .my_img{
    width: 100%;
    height: 100%;
  }
  .close_photo{
    position: absolute;
    width: 15px;
    height: 15px;
    top: -10px;
    right: -10px;
  }
  .border_p{
    margin: 0;
    margin-top: 15px;
  }
  .border_color{
    width: 100%;
    height: 100%;
  }
.refund_all{
  border-bottom: 1px solid #eeeeee;
  text-align: left;
}
.refund_sub{
  width: 72%;
  height: 45px;
  line-height: 45px;
  margin: auto;
  border: none;
  background-color: #EC414D;
  border-radius: 40px;
  color: white;
  font-size: 18px;
  margin: 15px 0;
}
.font_color{
  color: #999999;
}
.word_i_refund{
  width: 95%;
  margin: auto;
  padding: 15px 0;
}
.refund_tel{
  height: 50px;
  line-height: 50px;
  width: 95%;
  margin: auto;
}
.refund_tel p{
  margin: 0;
}
.refund_tel p label{
  float: left;
}
.refund_tel p input{
  width: 200px;
  float: left;
  border: none;
  outline: none;
  height: 45px;
  line-height: 45px;
  text-indent: 10px;
}
.word_last{
  width: 79%;
  margin: auto;
  margin-top: -5px;
  padding: 0px 2px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  text-align: right;
  background-color: #f4f4f4;
  color: #999999;
  height: 20px;
}
.refund_question{
  height: 50px;
  line-height: 50px;
  text-align: left;
  width: 95%;
  margin: auto;
}
.photo{
  text-align: left;
  margin: 0px;
  height: 37px;
  line-height: 37px;
  position: relative;
}
  .photo input{
    position: absolute;
    width: 18px;
    height: 14px;
    left: 0;
    top: 7px;
    color: white;
    background-color: white;
    border: none;
    opacity: 0;
    z-index: 10;
  }
.photo img{
  width: 18px;
  height: 14px;
  position: absolute;
  left: 0;
  top: 7px;
}
.question_des{
  width: 95%;
  margin: auto;
}
.desciption{
  width: 79%;
  height: 155px;
  margin: auto;
  background-color: #f4f4f4;
  text-indent: 15px;
  border: none;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding-top: 10px;
  color: #999999;
  outline: none;
  padding-bottom: 0px;
}
.refund_question p{
  margin: 0;
}
.choose{
  height: 50px;
  margin: 0;
  line-height: 50px;
}
.refund_choose{
  float: right;
}
.choose_word{
  height: 50px;
}
.choose_img{
  width: 15px;
  float: right;
  margin-top: 20px;
  margin-left: 10px;
}
.choose_right_i{
  transform:rotate(-90deg);
  -ms-transform:rotate(-90deg); 	/* IE 9 */
  -moz-transform:rotate(-90deg); 	/* Firefox */
  -webkit-transform:rotate(-90deg); /* Safari 和 Chrome */
  -o-transform:rotate(-90deg); 	/* Opera */
}
  .refund_title{
    width: 95%;
    margin: auto;
  }
  .refund_title p:first-child{
    color: #333333;
  }
  .refund_word_i{
    margin: 20px 0 20px 0px;
  }
  .refund_border{
    padding: 5px;
    color: #ff5555;;
    border: 2px solid #ff5555;
    border-radius: 3px;
  }
  .refund_word{
    font-size: 11px;
    padding-left: 5px;
  }
</style>
