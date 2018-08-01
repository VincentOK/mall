<!--申请退还运费-->
<template>
    <div class="freight_all">
      <div class="freight_one">
        <label>运费（元）</label>
        <input type="number" placeholder="请输入您所垫付的运费" v-model="money">
      </div>
      <div class="freight_one">
        <label>支付宝账号</label>
        <input type="text"  onKeyUp="value=value.replace(/[\W]/g,'')"  placeholder="审核通过后，运费将退还至您的支付宝" v-model="ali_number">
      </div>
      <div class="freight_one">
        <label>快递公司</label>
        <input type="text" style="text-indent: 20px" placeholder="" v-model="compony">
      </div>
      <div class="freight_one">
        <label>快递单号</label>
        <input type="text" onKeyUp="value=value.replace(/[\W]/g,'')" style="text-indent: 20px" placeholder="" v-model="courier">
      </div>
      <div>
        <button class="refund_sub" v-on:click="subSave(getId)">提交</button>
      </div>

      <dialog-view  :dialogblock="freightDialog"></dialog-view>
    </div>
</template>

<script>
  import Vue from 'vue'
  import mydialog from '../dialog/mydialog'
  Vue.component('dialog-view',mydialog)
    export default {
      name: "freight",
      data(){
          return{
            getId:'',
            money:'',
            ali_number:'',
            compony:'',
            courier:'',
            freightDialog:{
              flag:false,
              msg:''
            },

          }
      },
      mounted(){
        let id = this.$route.params.id
        this.getId = id
      },
      comments:{
        mydialog
      },
      methods:{
          subSave:function (id) {
            let money = this.money
            let ali_number = this.ali_number
            let compony = this.compony
            let courier = this.courier
            if(money && ali_number && compony && courier){
              alert("请求服务端")
              this.$router.push('/refundlist')
            }else {
              console.log("信息未填完")
              this.freightDialog = {
                flag:true,
                msg:'信息未填完'
              };
            }
          }
      }
    }
</script>

<style scoped>
.freight_all{
  width: 95%;
  margin: auto;
}
  .freight_one{
    height: 55px;
    line-height: 55px;
    text-align: left;
    border-bottom: 1px solid #eeeeee;
  }
  .freight_one label{
    width: 150px;
    height: 55px;
    text-align: left;
  }
  .freight_one input{
    height: 50px;
    width: 75%;
    line-height: 50px;
    outline: none;
    border: none;
    text-indent: 10px;
    color: #999999;
    font-size: 12px;
  }
.refund_sub{
  width: 270px;
  height: 45px;
  line-height: 45px;
  margin: auto;
  border: none;
  background-color: #EC414D;
  border-radius: 40px;
  color: white;
  font-size: 18px;
  margin-top: 78px;
}
</style>
