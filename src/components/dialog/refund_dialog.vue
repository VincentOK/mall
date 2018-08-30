<template>
  <div v-if="refund_display">
    <div class="refund_wai">
    </div>
    <div class="refund_content">
      <p>确定已收到商品？
      </p>
      <div class="btn_">
        <div class="btn_left" v-on:click="refundCancel">取消</div>
        <div class="btn_right" v-on:click="refundSure">确定</div>
      </div>
    </div>
  </div>

</template>

<script>
  import {sureRefund} from '../../config/request'
    export default {
        name: "refund_dialog",
      props:['checkStatus'],
      data(){
          return{
            refund_display:true,
          }
      },
      methods:{
        refundCancel:function () {
          this.refund_display = false
          this.$emit('childByValue',{status:this.refund_display})
        },
        refundSure:function () {
          console.log("订单号："+this.checkStatus)
          let orderNumber = this.checkStatus
          sureRefund(orderNumber).then(res =>{
            console.log("确认收货："+res)
            this.refund_display = false
            this.$emit('childByValue',{status:this.refund_display,orderNumber:orderNumber})
          }).catch(err =>{
            console.log(err)
          })
        }
      }
    }
</script>

<style scoped>
  .btn_{
    display: flex;
    height: 49px;
    line-height: 49px;
    text-align: center;
  }
  .btn_left{
    flex: 1;
    border-top: 1px solid #eeeeee;
    border-right: 1px solid #eeeeee;
    color: #333333;
  }
  .btn_right{
    flex: 1;
    border-top: 1px solid #eeeeee;
    color: #f10215;
  }
.refund_wai{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 99999;
  background-color: black;
  opacity: 0.5;
}
.refund_content p{
  height: 81px;
  line-height: 81px;
  width: 100%;
  margin: 0;
  text-align: center;
  font-size: 16px;

}
  .refund_content{
    width: 238px;
    height: 130px;
    background-color: white;
    border-radius: 10px;
    margin: auto;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100000;
  }
</style>
