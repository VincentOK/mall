<!--时间币+现金购买-->
<template>
  <div class="exchange">
    <div>
      <p class="exchange_title">抵扣专区</p>
      <p class="exchange_word">精美商品&nbsp;&nbsp;超值抵扣</p>
    </div>
    <div class="exchange_content">
      <router-link class="a_detail" v-for="item in de_list" :key="item" :to="'/detail/' + item.id">
        <div class="exchange_content_i">
          <img :src="item.img_url" alt="">
          <div class="word_i">
            <p class="word_name">{{item.name}}</p>
            <p class="word_name_two">
              <label class="word_money">￥{{item.price}}</label>
              <label class="word_count_i">+</label>
              <label class="exchange_border">&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <label class="word_count_i">{{item.time_money}}</label>
            </p>
            <p class="word_name_th">
              <label class="word_count">剩余{{item.count}}件</label>
            </p>
          </div>
        </div>
      </router-link>

    </div>
  </div>
</template>

<script>
export default {
  name: 'dedution',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      de_list:[],
    }
  },
  mounted(){
    this.de_list = [
      {
        id:'1',
        img_url:'/static/img/a1.jpg',
        name:'海南贵妃特价海南贵妃 送货上门',
        price:'120.00',
        time_money:'356.58',
        count:'121'
      },
      {
        id:'2',
        img_url:'/static/img/a1.jpg',
        name:'海南贵妃特价海南贵妃 送货上门',
        price:'120.00',
        time_money:'356.58',
        count:'122'
      },
      {
        id:'3',
        img_url:'/static/img/a1.jpg',
        name:'海南贵妃特价海南贵妃 送货上门',
        price:'120.00',
        time_money:'356.58',
        count:'123'
      },
      {
        id:'4',
        img_url:'/static/img/a1.jpg',
        name:'海南贵妃特价海南贵妃 送货上门',
        price:'120.00',
        time_money:'356.58',
        count:'124'
      },
      {
        id:'5',
        img_url:'/static/img/a1.jpg',
        name:'海南贵妃特价海南贵妃 送货上门',
        price:'120.00',
        time_money:'356.58',
        count:'125'
      },
      {
        id:'6',
        img_url:'/static/img/a1.jpg',
        name:'海南贵妃特价海南贵妃 送货上门',
        price:'120.00',
        time_money:'356.58',
        count:'126'
      },
    ]
  },
  computed:{
  },
  methods:{
  }
}
</script>

<style scoped>
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
    background-color: #f4f4f4;
  }
  .exchange_content_i img{
    width: 100%;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  .exchange_content_i{
    display: inline-block;
    width: 46%;
    background-color: white;
    border-radius: 8px;
    margin-left: 1%;
    margin-right: 1%;
    margin-bottom: 10px;
  }
  .word_i{
    width: 90%;
    margin: auto;
    text-align: left;
  }
  .word_name{
    padding: 0;
    margin: 0;
    padding-top: 5px;
    font-size: 14px;
  }
  .word_name_two{
    margin: 0;
    padding: 5px 0;
    width: 100%;
  }
  .exchange_border{
    width: 30px;
    height: 30px;
    color: white;
    background-color: #efbf19;
    border-radius: 50%;
  }
  .word_money{
    color: #ec414d;
  }
  .word_count{
    float: right;
    color: darkgray;
    font-size: 12px;
    padding-bottom: 8px;
  }
  .word_count_i{
    color:darkgray;
  }
  .word_name_th{
    padding:0;
    margin: 0;
  }
</style>
