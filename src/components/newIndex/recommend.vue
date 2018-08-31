<template>
    <div>
        <div class="recommend">
            <p class="recommend_title">
              <i style="background-image: url('/static/img/recommend1.png')"></i>
              <span>为您推荐</span>
              <i style="background-image: url('/static/img/recommend2.png')"></i>
            </p>
            <div v-for="(item,index) in commodityCount" :key="index">
            <div class="exchange_content" v-if="item.listRMB.length !== 0">
              <router-link class="a_detail" v-for="(RMBitem,RMBindex) in item.listRMB" :key="RMBindex" :to="'/detail/' + RMBitem.commodityId +'/' + RMBitem.distributionChannel">
                <div class="exchange_content_i">
                  <div class="img_wrap">
                    <img :src="RMBitem.imgUrl" alt="">
                    <!-- <span class="swiper_goods_tag" v-if="RMBitem.goods_tag!='0'" :class="goodsTagStyle(RMBitem.goods_tag)">
                      <span>{{RMBitem.goods_tag | formatGoodTags}}</span>
                    </span> -->
                  </div>
                  <div class="word_i">
                    <p class="word_name">{{_protypeJs.maxSlice20(RMBitem.commodityName)}}</p>
                    <p class="word_name_two">
                      <label class="word_money"><label class="time">￥</label>{{RMBitem.realityPrice | formatMoney}}</label>
                      <label class="be_money"><del>￥{{RMBitem.suggestPrice | formatMoney}}</del></label>
                    </p>
                    <p class="last"> <label class="word_count">剩余{{RMBitem.inventory}}件</label></p>
                  </div>
                </div>
              </router-link>
          </div>
            <div class="flashSale_slide" v-if="item.listTimeCoin.length !== 0">
             <div class="swiper_wrapper">
                <div class="swiper_image" v-for="(Timeitem,Timeindex) in item.listTimeCoin" :key="Timeindex">
                    <div class="image_border">
                        <router-link class="a_detail" :to="'/detail/' + Timeitem.commodityId +'/' + Timeitem.distributionChannel">
                        <img :src="Timeitem.imgUrl">
                        <p class="swiper_name">{{_protypeJs.maxSlice13(Timeitem.commodityName)}}</p>
                        <p class="swiper_price">{{Timeitem.timecoinPrice | formatMoney}}<span>时间币</span></p>
                        <p class="swiper_del_price"><del>￥{{Timeitem.suggestPrice | formatMoney}}</del></p>
                        <p class="swiper_surplus_count">剩余{{Timeitem.inventory}}件</p>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="null_div"></div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "recommend",
  data() {
    return {
      isRedGoodsTag: false,
      isGreenGoodsTag: false,
      isOriginGoodsTag: false,
      goods_tag: "",
      commodity_list: [],
      commodity_time_list: [],
    };
  },
  props: {
    commodityList: {
      type: Array
    },
    commodityTimeList: {
      type: Array
    },
    commodityCount: {
      type: Array
    }
  },
  filters: {
  
   
  },
  methods: {
    goodsTagStyle(id) {
      switch (id) {
        case "1":
          return { isRedGoodsTag: true };
          break;
        case "2":
          return { isGreenGoodsTag: true };
          break;
        case "3":
          return { isOriginGoodsTag: true };
          break;
        default:
          return "";
      }
    },
  },
  mounted() {}
};
</script>

<style scoped>
.recommend_title {
  margin: 0;
  height: 70px;
  width: 100%;
  background-color: #f5f7f9;
  color: #f10215;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}
.recommend_title span {
  margin: 0 10px;
}
.recommend_title i {
  display: inline-block;
  width: 25px;
  height: 5px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: 0 0;
}
.a_detail {
  text-decoration: none;
}
.img_wrap {
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
  border-top-left-radius: 8px;
  border-bottom: 30px solid transparent;
  border-top: 10px solid red;
  border-left: 30px solid red;
  border-right: 10px solid transparent;
}
.isRedGoodsTag {
  border-top-color: #f10215;
  border-left-color: #f10215;
}
.isGreenGoodsTag {
  border-top-color: #11bb55;
  border-left-color: #11bb55;
}
.isOriginGoodsTag {
  border-top-color: #fb7539;
  border-left-color: #fb7539;
}
.swiper_goods_tag span {
  position: absolute;
  top: -4px;
  left: -28px;
  display: inline-block;
  font-size: 12px;
  width: 25px;
  transform: rotate(7deg);
  -ms-transform: rotate(7deg);
  -moz-transform: rotate(7deg);
  -webkit-transform: rotate(-50deg);
  -o-transform: rotate(7deg);
}
.flashSale_slide {
  height: 100%;
  width: 100%;
  background-color: #f5f7f9;
}
.swiper_wrapper {
  background-color: #fff;
  display: flex;
  height: 245px;
  margin: 0 15px;
  border-radius: 8px;
}
.swiper_wrapper .swiper_image {
  height: 107px;
  width: 33%;
  margin: 0 0 0 9px;
  margin-top: 9px;
}
.swiper_wrapper .swiper_image:first-child {
  margin-left: 5px;
}
.swiper_wrapper .swiper_image:last-child {
  margin-right: 5px;
}
.swiper_wrapper .image_border {
  width: 100%;
  height: 107px;
}
.swiper_wrapper img {
  width: 100%;
  height: 100%;
  background-size: cover;
}
.image_border p {
  text-align: left;
}
.swiper_name {
  margin: 0 auto;
  padding:7px 5px 12px 0;
  font-size: 11px;
  color: #333;
}
.swiper_price {
  margin: 0;
  padding-bottom: 5px;
  font-size: 13px;
  color: #f10215;
  font-weight: bold;
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
.swiper_surplus_count {
  margin: 0;
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
.exchange_content {
  width: 100%;
  margin: auto;
  background-color: #f5f7f9;
  padding-bottom: 9px;
}
.exchange_content_i img {
  width: 171px;
  height: 171px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.exchange_content_i {
  display: inline-block;
  width: 171px;
  background-color: white;
  border-radius: 8px;
  margin-left: 1%;
  margin-right: 1%;
  margin-top: 10px;
}
.word_i {
  width: 90%;
  margin: auto;
  text-align: left;
}
.word_name {
  padding: 0;
  margin: 0;
  color: #333333;
  padding-top: 8px;
  font-size: 13px;
}
.word_name_two {
  margin: 0;
  padding: 10px 0 6px 0;
  width: 100%;
}
.word_money {
  color: #f10215;
  font-size: 16px;
  font-weight: 600;
}
.time {
  font-size: 12.5px;
}
.be_money {
  font-size: 11px;
  color: #9b9b9b;
  margin-left: 6px;
  text-decoration: line-through;
}
.last {
  margin: 0;
  padding-bottom: 12px;
}
.word_count {
  color: #9b9b9b;
  font-size: 11px;
}
</style>


