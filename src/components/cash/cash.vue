<!--仅限时间币兑换-->
<template>
  <div>
    <shoptitle v-bind:childTitleword="childTitleword"></shoptitle>


    <div class="exchange conent_all_h5"  v-touch:swiperight="_protypeJs.touchRight">
      <div>
        <p class="exchange_number">共{{all_goods}}个商品</p>
      </div>
      <div class="exchange_content">
        <scroller class="myScroller"   :on-infinite="infinite"  :on-refresh = "refresh" ref="myscroller" :height="_protypeJs.getScrollerHeight(80)" style="top: 80px">
          <div style="height: 1px;"></div>
        <router-link class="a_detail" v-for="(item,index) in ex_list" :key="index" :to="'/detail/' + item.commodityId+'/'+goodsType">
          <div class="exchange_content_i">
            <!--<img src="/static/img/a1.jpg" alt="">-->
            <img :src="item.imgUrl" alt="">
            <div class="word_i">
              <p class="word_name">{{item.commodityName}}</p>
              <p class="word_name_two">
                <label class="word_money"><label class="time">￥</label>{{item.realityPrice}}</label>
                <label class="be_money">￥{{item.suggestPrice}}</label>
              </p>
              <p class="last"> <label class="word_count">剩余{{item.inventory}}件</label></p>
            </div>
          </div>
        </router-link>
        </scroller>
      </div>
    </div>
  </div>
</template>

<script>
  import { getCashList } from '../../config/request'
export default {
  name: 'cash',
  data () {
    return {
      all_goods:'',
      goodsType:1,
      msg: '',
      childTitleword:'现金专区',
      ex_list:[],
      count:0,
      isFirstEnter:false
    }
  },
  created() {
    this.isFirstEnter=true;
    // 只有第一次进入或者刷新页面后才会执行此钩子函数
    // 使用keep-alive后（2+次）进入不会再执行此钩子函数
  },
  activated() {
    console.log('cashActivated:'+this.$route.meta.isBack+'='+this.isFirstEnter);
    let self = this;
    if(!this.$route.meta.isBack || this.isFirstEnter){
      console.log('cashActivated请求新数据')
      // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
      // 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
      this.ex_list=[];// 把数据清空，可以稍微避免让用户看到之前缓存的数据
      self.noData = "";
      self.count = 0;
    }
    // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
    this.$route.meta.isBack=false;
    // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
    this.isFirstEnter=false;
  },
  deactivated(){
    console.log('cashDeactivated')
  },
  beforeRouteEnter(to, from, next) {
    console.log("路由："+from.name)
    // 路由导航钩子，此时还不能获取组件实例 `this`，所以无法在data中定义变量（利用vm除外）
    // 参考 https://router.vuejs.org/zh-cn/advanced/navigation-guards.html
    // 所以，利用路由元信息中的meta字段设置变量，方便在各个位置获取。这就是为什么在meta中定义isBack
    // 参考 https://router.vuejs.org/zh-cn/advanced/meta.html
    if(from.name=='detail'){
      to.meta.isBack=true;
      //判断是从哪个路由过来的，
      //如果是page2过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
    }

    next();
  },
  mounted(){
    console.log(document.documentElement.clientHeight)
    // console.log(document.documentElement.clientHeight)
    // let height = document.documentElement.clientHeight;
    // let scroller = height - 80;
    // this.heightScroller = scroller
    // console.log(scroller)
    // let vm = this
    // getCashList(1).then(res =>{
    //   console.log(res)
    //   if(res.dataList.length !=0){
    //     vm.ex_list = vm.ex_list.concat(res.dataList)
    //   }
    // }).catch(err =>{
    //   console.log(err)
    // })
  },
  computed:{
  },
  methods:{
    infinite(done) {
      if(this.noData) {
        setTimeout(()=>{
          this.$refs.myscroller.finishInfinite(2);
        })
        return;
      }
      let self = this;//this指向问题
      self.count++;
     setTimeout(() => {
       console.log("页码"+self.count);
        getCashList(self.goodsType,self.count).then(res =>{
          console.log(res)
          self.all_goods = res.total
          if(res.dataList.length != 0){
            self.ex_list = self.ex_list.concat(res.dataList)
          }else {
            self.noData = "没有更多数据"
          }
          self.$refs.myscroller.resize();
          done()
        }).catch(err =>{
          console.log(err)
        })

      }, 1500)
    },
    refresh (done) { //这是向下滑动的时候请求最新的数据
      console.log("向下滑动")
      setTimeout(() => {
        done()
      }, 1500)
    },
  },
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
    z-index: 999999999;
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
