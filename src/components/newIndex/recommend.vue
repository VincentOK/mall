<template>
    <div>
        <div class="recommend">
            <p class="recommend_title">
              <i style="background-image: url('/static/img/recommend1.png')"></i>
              <span>为您推荐</span>
              <i style="background-image: url('/static/img/recommend2.png')"></i>
            </p>
            <div class="commodity_details" v-for="(item,index) in commodity_list" :key="index">
                <router-link class="a_detail" :to="'/detail/' + item.id">
                <div class="img_wrap">
                    <img :src="item.img_url" alt="">
                    <span class="swiper_goods_tag" v-if="item.goods_tag!='0'" :class="goodsTagStyle(item.goods_tag)">
                      <span>{{item.goods_tag | formatGoodTags}}</span>
                    </span>
                </div>
                <div class="img_wrap_right">
                    <p class="commidity_name">{{maxSlice(item.name)}}</p>
                    <div class="commodity_price">
                        <span>{{item.price | formatMoney}}</span>
                        <span><del>{{item.original_cost | formatMoney}}</del></span>
                    <p class="surplus">剩余{{item.count}}件</p>
                    </div>
                </div>
                </router-link>
            </div>
            <div class="null_div"></div>
            <div class="flashSale_slide">
             <div class="swiper_wrapper">
                <div class="swiper_image" v-for="(item,index) in commodity_time_list" :key="index">
                    <div class="image_border">
                        <router-link class="a_detail" :to="'/detail/' + item.id">
                        <img src="/static/img/a1.jpg">
                        <p class="swiper_name">{{maxHorizontalSlice(item.name)}}</p>
                        <p class="swiper_price">{{item.price}}<span>时间币</span></p>
                        <p class="swiper_del_price"><del>{{item.original_cost | formatMoney}}</del></p>
                        <p class="swiper_surplus_count">剩余{{item.count}}件</p>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
            <div class="null_div"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: "recommend",
  data() {
    return {
      isRedGoodsTag:false,
      isGreenGoodsTag:false,
      isOriginGoodsTag:false,
      goods_tag:'',
      commodity_list: [],
      commodity_time_list: [],
      maxLength: 20,
      maxHorizontalLength: 15
    };
  },
  filters: {
    formatMoney: function(price) {
      return "￥" + Number(price).toFixed(2);
    },
    formatGoodTags(goodId){
      switch(goodId){
        case "1":
        return '热销'
        break;
        case "2":
        return '新品'
        break
        case "3":
        return '特价'
        break
        default :
        return ''
      }
    },
  },
  methods: {
    goodsTagStyle(id){
      switch(id){
        case "1":
        return {isRedGoodsTag:true}
        break;
        case "2":
        return {isGreenGoodsTag:true}
        break
        case "3":
        return {isOriginGoodsTag:true}
        break
        default :
        return ''
      }
    },
    maxSlice(parm) {
      return parm.length > this.maxLength
        ? parm.slice(0, this.maxLength) + "..."
        : parm;
    },
    maxHorizontalSlice(parm) {
      return parm.length > this.maxHorizontalLength
        ? parm.slice(0, this.maxHorizontalLength) + "..."
        : parm;
    }
  },
  mounted() {
    this.commodity_list = [
      {
        id: "1",
        img_url: "/static/img/a1.jpg",
        name:"海南贵妃特价海南贵妃特价海南贵南贵妃特价海南贵妃妃南贵妃海南贵妃特价海南贵妃特价海南贵南贵妃特价海南贵妃妃南贵妃海南贵妃特价海南贵妃特价海南贵南贵妃特价海南贵妃妃南贵妃 送货上门",
        price: "120.00",
        time_money: "356.58",
        original_cost: "345",
        goods_tag:'1',
        count: "121"
      },
      {
        id: "2",
        img_url: "/static/img/a1.jpg",
        name: "海南贵妃特价海南贵妃 送货上门",
        price: "120.00",
        time_money: "356.58",
        original_cost: "345",
        goods_tag:'2',
        count: "122"
      },
      {
        id: "3",
        img_url: "/static/img/a1.jpg",
        name: "海南贵妃特价海南贵妃 送货上门",
        price: "120.00",
        time_money: "356.58",
        original_cost: "345",
        goods_tag:'3',
        count: "123"
      },
      {
        id: "4",
        img_url: "/static/img/a1.jpg",
        name: "海南贵妃特价海南贵妃 送货上门",
        price: "120.00",
        time_money: "356.58",
        original_cost: "345",
        goods_tag:'0',
        count: "124"
      },
      {
        id: "5",
        img_url: "/static/img/a1.jpg",
        name: "海南贵妃特价海南贵妃 送货上门",
        price: "120.00",
        time_money: "356.58",
        original_cost: "345",
        goods_tag:'3',
        count: "125"
      }
    ];
    this.commodity_time_list = [
      {
        id: "1",
        img_url: "/static/img/a1.jpg",
        name:
          "海南贵妃特价海南贵妃特价海南贵南贵妃特价海南贵妃妃南贵妃海南贵妃特价海南贵妃特价海南贵南贵妃特价海南贵妃妃南贵妃海南贵妃特价海南贵妃特价海南贵南贵妃特价海南贵妃妃南贵妃 送货上门",
        price: "120.00",
        time_money: "356.58",
        count: "121",
        original_cost: "345"
      },
      {
        id: "2",
        img_url: "/static/img/a1.jpg",
        name: "海南贵妃特价海南贵妃 送货上门",
        price: "120.00",
        time_money: "356.58",
        count: "122",
        original_cost: "345"
      },
      {
        id: "3",
        img_url: "/static/img/a1.jpg",
        name: "海南贵妃特价海南贵妃 送货上门",
        price: "120.00",
        time_money: "356.58",
        original_cost: "345",
        count: "123"
      }
    ];
  }
};
</script>

<style scoped>
.recommend_title {
  margin: 0;
  height: 74px;
  width: 100%;
  border-bottom: 1px solid #eee;
  color: #f10215;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.recommend_title span {
  margin: 0 10px;
}
.recommend_title i{
  display: inline-block;
  width: 25px;
  height: 5px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: 0 0;
}
.commodity_details {
  height: 113px;
  padding: 12px 20px 12px 12px;
  border-bottom: 1px solid #eee;
}
.a_detail {
  text-decoration: none;
}
.img_wrap {
  float: left;
  width: 113px;
  height: 100%;
  position: relative;
}
.swiper_goods_tag {
  position: absolute;
  top: 0;
  left: 0;
  color: #fff;
  display: inline-block;
  height: 0px;
  width: 0px;
  text-align: left;
  border-top-left-radius: 5px;
  border-bottom: 30px solid transparent;
  border-top: 10px solid red;
  border-left: 30px solid red;
  border-right: 10px solid transparent;
  /* border-top-color: blue;
  border-left-color: blue; */
}
.isRedGoodsTag{
  border-top-color: #f10215;
  border-left-color: #f10215;
}
.isGreenGoodsTag{
  border-top-color: #11bb55;
  border-left-color: #11bb55;
}
.isOriginGoodsTag{
  border-top-color: #fb7539;
  border-left-color: #fb7539;
}
.swiper_goods_tag span {
  position: absolute;
  top: -5px;
  left: -30px;
  display: inline-block;
  font-size: 9px;
  width: 25px;
  transform: rotate(7deg);
  -ms-transform: rotate(7deg);
  -moz-transform: rotate(7deg);
  -webkit-transform: rotate(-50deg);
  -o-transform: rotate(7deg);
}
.img_wrap img {
  width: 113px;
  height: 100%;
  background-size: cover;
  border-radius: 5px;
}
.img_wrap_right {
  height: 100%;
  margin-left: 130px;
  position: relative;
  overflow: hidden;
  text-align: left;
}
.commidity_name {
  width: 100%;
  font-size: 14px;
  color: #333;
  margin: 11px 0 0 0;
}
.commodity_price {
  position: absolute;
  bottom: 0;
}
.commodity_price span:first-child {
  color: #f10215;
  font-size: 13px;
  margin-right: 6px;
}
.commodity_price span {
  color: #9b9b9b;
  font-size: 11px;
}
.surplus {
  color: #9b9b9b;
  font-size: 12px;
  margin: 6px 0 00;
}
.flashSale_slide {
  height: 100%;
}
.swiper_wrapper {
  display: flex;
  height: 238px;
}
.swiper_wrapper .swiper_image {
  height:112px;
  width: 33%;
  border-radius: 10px;
  margin: 15px 0 0 9px;
}
.swiper_wrapper .swiper_image:last-child {
  margin-right: 9px;
}
.swiper_wrapper .image_border {
  width: 100%;
  height: 113px;
}
.swiper_wrapper img {
  width: 100%;
  height: 100%;
  /* padding-bottom: 100%;
        overflow:hidden;
        background-position: center center;
        background-repeat: no-repeat;
        -webkit-background-size:cover;
        -moz-background-size:cover; */
  background-size: cover;
  border-radius: 5px;
}
.image_border p {
  text-align: left;
}
.swiper_name {
  margin: 7px auto;
  font-size: 11px;
  color: #333;
}
.swiper_price {
  margin: 0;
  padding-bottom: 5px;
  font-size: 13px;
  color: #f10215;
}
.swiper_price span {
  margin-left: 2px;
  font-size: 9px;
}
.swiper_del_price {
  margin: 0;
  padding-bottom: 5px;
  font-size: 9px;
  color: #9b9b9b;
}
.swiper_surplus_count{
  margin:0;
  padding: 0;
  color: #9b9b9b;
  font-size: 9px;
}
.last_explain {
  height: 28px;
  width: 100%;
  background-color: #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: Center;
}
.last_explain span {
  width: 33.3%;
  font-size: 13px;
  color: #333;
}
</style>


