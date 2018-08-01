<!--选择退款原因-->
<template>
    <div>
      <div class="whynot_bg"></div>
      <div class="whynot_content">
        <p>
          <label>申请原因</label>
          <img v-on:click="sure_not()" class="whynot_close" src="/static/img/pay_close.png" alt="">
        </p>
        <p class="whynot_title">
          <label>退货</label>
        </p>
        <div class="content_all">
          <p v-for="item in list" :key="item" v-on:click="sure_not(item)">{{item.msg}}</p>
          <!--<p>不想要了</p>-->
          <!--<p>商品降价</p>-->
          <!--<p>发错货</p>-->
          <!--<p>质量问题</p>-->
          <!--<p>商品与质量不符</p>-->
          <!--<p>商品损坏</p>-->
          <!--<p>其他</p>-->
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "whynotwant",
      data(){
          return{
            list:[]
          }
      },
      mounted(){
          this.list= [
            {
              id:1,
              msg:'缺少件'
            },
            {
              id:2,
              msg:'不想要了'
            },
            {
              id:3,
              msg:'商品降价'
            },
            {
              id:4,
              msg:'发错货'
            },
            {
              id:5,
              msg:'质量问题'
            },
            {
              id:6,
              msg:'商品与质量不符'
            },
            {
              id:7,
              msg:'商品损坏'
            },
            {
              id:8,
              msg:'其他'
            },
          ]
      },
      methods:{
        sure_not:function (detail) {
          if(detail){
            this.$emit('getWhynot',detail)
          }else{
            this.$emit('getWhynot',true)
          }
        }
      },

    }
</script>

<style scoped>
.whynot_bg{
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: black;
  opacity: 0.5;
  top: 0;
}
.whynot_title{
  color: #ec414d;
  font-size: 14px;
  text-align: left;
  width: 95%;
  margin: auto;
  border-bottom: 1px solid #f4f4f4;
  padding-bottom: 5px;
}
.whynot_title label{
  border-bottom: 2.5px solid #ec414d;
  padding:  5px 0;
}
  .whynot_content{
    position: fixed;
    width: 100%;
    margin: auto;
    background-color: white;
    bottom: 0;
  }
  .whynot_content p:first-child{
    margin: 0;
    padding: 10px 0;
  }
.whynot_content p:first-child label{
  font-size: 15px;
}
  .whynot_close{
    float: right;
    width: 15px;
    margin-right: 10px;
  }
  .content_all{
    width: 95%;
    margin: auto;
    text-align: left;
  }
  .content_all p:first-child{
    margin-top: 15px;
  }
  .content_all p{
    margin: 0;
    padding: 15px 0;
  }
</style>
