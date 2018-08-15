<!--仅限时间币兑换-->
<template>
  <div>
    <shoptitle v-bind:childTitleword="childTitleword"></shoptitle>


    <div class="exchange conent_all_h5"  v-touch:swiperight="_protypeJs.touchRight">
      <div>
        <p class="exchange_number">共10256个商品</p>
      </div>
      <div class="exchange_content">
        <scroller style="margin-top: 90px" :on-infinite="infinite"  :on-refresh = "refresh" ref="myscroller">
          <div style="height: 1px;"></div>
        <router-link class="a_detail" v-for="(item,index) in ex_list" :key="index" :to="'/detail/' + item.id">
          <div class="exchange_content_i">
            <img :src="item.img_url" alt="">
            <div class="word_i">
              <p class="word_name">{{item.name}}</p>
              <p class="word_name_two">
                <label class="word_money"><label class="time">￥</label>{{item.price}}</label>
                <label class="be_money">￥150</label>
              </p>
              <p class="last"> <label class="word_count">剩余{{item.count}}件</label></p>
            </div>
          </div>
        </router-link>
        </scroller>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cash',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      childTitleword:'现金专区',
      ex_list:[],
    }
  },
  mounted(){
    this.ex_list = [
      {
        id:'1',
        img_url:'/static/img/a1.jpg',
        name:'海南贵妃特价海南贵妃 送货上门',
        price:'120',
        count:'121'
      },
      {
        id:'2',
        img_url:'/static/img/a1.jpg',
        name:'海南贵妃特价海南贵妃 送货上门',
        price:'120',
        count:'122'
      },
      {
        id:'3',
        img_url:'/static/img/a1.jpg',
        name:'海南贵妃特价海南贵妃 送货上门',
        price:'120',
        count:'123'
      },
      {
        id:'4',
        img_url:'/static/img/a1.jpg',
        name:'海南贵妃特价海南贵妃 送货上门',
        price:'120',
        count:'124'
      },
      {
        id:'5',
        img_url:'/static/img/a1.jpg',
        name:'海南贵妃特价海南贵妃 送货上门',
        price:'120',
        count:'125'
      },
      {
        id:'6',
        img_url:'/static/img/a1.jpg',
        name:'海南贵妃特价海南贵妃 送货上门',
        price:'120',
        count:'126'
      },
    ]
  },
  computed:{
  },
  methods:{
    infinite (done) {
      console.log("向上滑动")

      this.offset++    //每当向上滑动的时候就让页数加1
      console.log("向上滑动页码:"+ this.offset)
      console.log("done:"+done)
      if(this.noData) {
        setTimeout(()=>{
          this.$refs.myscroller.finishInfinite(2);
        })
        return;
      }
      let self = this;//this指向问题
      let start = this.ex_list.length;
      let obj = {
          id:'1',
          img_url:'/static/img/a1.jpg',
          name:'海南贵妃特价海南贵妃 送货上门',
          price:'120',
          count:'121'
        }
      setTimeout(() => {
        self.ex_list.push(obj)
        self.ex_list.push(obj)
        if(start > 10) {
          self.noData = "没有更多数据"
        }
        self.$refs.myscroller.resize();
        done()
      }, 1500)
      // done(function (e) {
      //   console.log(e)
      // })
      // this.getDate(this.offset, done)
    },
    refresh (done) { //这是向下滑动的时候请求最新的数据
      console.log("向下滑动")
      setTimeout(() => {
        done()
      }, 1500)
      // this.offset = 0
      // this.getDate(1, done)
    },
  }
}
</script>

<style scoped>
  .exchange_number{
    color: #9b9b9b;
    font-size: 12px;
    height: 39px;
    line-height: 39px;
    width: 100%;
    padding-left: 12px;
    text-align: left;
    background-color: #f2f2f2;
    margin: 0;
    position: fixed;
    top: 40px;
    z-index: 99999;
  }
  .a_detail{
    color: black;
  }
  .exchange{
    font-size: 13px;
  }
.exchange_title{
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  padding-top: 10px;
}
  .exchange_word{
    margin: 0;
    padding: 5px 0;
    color: darkgray;
  }
  .exchange_content{
    width: 100%;
    margin: auto;
    background-color: #f5f7f9;
    padding-top: 39px;
    /*padding-bottom: 39px;*/
  }
  .exchange_content_i img{
    width: 171px;
    height: 171px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  .exchange_content_i{
    display: inline-block;
    width: 171px;
    /*width: 46%;*/
    background-color: white;
    border-radius: 8px;
    margin-left: 1%;
    margin-right: 1%;
    margin-top: 10px;
  }
  .word_i{
    width: 90%;
    margin: auto;
    text-align: left;
  }
  .word_name{
    padding: 0;
    margin: 0;
    color: #333333;
    padding-top: 11px;
    font-size: 13px;
  }
  .word_name_two{
    margin: 0;
    padding: 12px 0 6px 0;
    width: 100%;


  }
  .word_money{
    color: #f10215;
    font-size: 16px;
    font-weight: 600;
  }
  .time{
    font-size: 9px;
  }
  .be_money{
    font-size: 11px;
    color: #9b9b9b;
    margin-left: 6px;
    text-decoration: line-through;
  }
  .last{
    margin: 0;
    padding-bottom: 12px;
  }
  .word_count{
    color: #9b9b9b;
    font-size: 11px;
  }
</style>
