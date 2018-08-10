<template>
    <div class="flash_sale">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in cash_list" :key="index">
            <div class="swiper_slide">
              <router-link class="a_detail" :to="'/detail/' + item.id">
                <div class="image_border">
                    <img :src="item.img_url" alt="">
                  <p class="swiper_name">{{maxSlice(item.name)}}</p>
                  <p class="swiper_price">{{item.price | formatMoney}}</p>
                  <p class="swiper_del_price"><del>{{item.original_cost |formatMoney}}</del></p>
                  <span :class="goodsTagStyle(item.goods_tag)" class="swiper_goods_tag"><span>{{item.goods_tag | formatGoodTags}}</span></span>
                  <span v-show="goods_tag">抢购结束</span>
                </div>
                </router-link>
            </div>
          </swiper-slide>
          <router-link class="a_detail" :to="'/snapuplist'">
          <div class="view_more">
              <p>查看更多</p>
              <p>See more</p>
          </div>
          </router-link>
        </swiper>
        <div class="last_explain">
            <span><i style="background-image: url('/static/img/store.png')"></i>扶贫商城</span>
            <span><i style="background-image: url('/static/img/pinkage.png')"></i>价格实惠</span>
            <span><i style="background-image: url('/static/img/quality.png')"></i>正品保证</span>
            <span><i style="background-image: url('/static/img/quality2.png')"></i>品质溯源</span>
        </div>
    </div>
</template>

<script>
export default {
  name: "flashSale",
  data() {
    return {
      goods_tag: "",
      swiper_goods_tag: "",
      isGreenGoodsTag: false,
      isBlackGoodsTag: false,
      cash_list: [],
      maxLength: 15,
      swiperOption: {
        slidesPerView: "auto",
        slidesOffsetAfter: 110,
        freeMode: true,
        freeModeMomentumVelocityRatio: 0.3,
        freeModeMomentumBounce: false,
        loop: false,
        observer: true,
        observeParents: true
      }
    };
  },
  methods: {
    maxSlice(parm) {
      return parm.length > this.maxLength
        ? parm.slice(0, this.maxLength) + "..."
        : parm;
    },
    goodsTagStyle(id) {
      switch (id) {
        case "1":
          return { isGreenGoodsTag: true };
          break;
        case "2":
          return { isBlackGoodsTag: true };
          break;
        default:
          return "";
      }
    }
  },
  filters: {
    formatMoney: function(price) {
      return "￥" + Number(price).toFixed(2);
    },
    formatGoodTags(goodId) {
      switch (goodId) {
        case "1":
          return "即将开始";
          break;
        case "2":
          return "抢购结束";
          break;
        default:
          return "";
      }
    }
  },
  mounted() {
    this.cash_list = [
      {
        id: "1",
        img_url: "/static/img/a1.jpg",
        name:
          "海南贵妃特价海南贵妃特价海南贵南贵妃特价海南贵妃妃南贵妃海南贵妃特价海南贵妃特价海南贵南贵妃特价海南贵妃妃南贵妃 送货上门",
        price: "120.00",
        time_money: "356.58",
        original_cost: "345",
        goods_tag: "1",
        count: "121"
      },
      {
        id: "2",
        img_url: "/static/img/a1.jpg",
        name: "货上门",
        price: "120.00",
        time_money: "356.58",
        original_cost: "345",
        goods_tag: "1",
        count: "122"
      },
      {
        id: "3",
        img_url: "/static/img/a1.jpg",
        name: "海南贵妃特价海南贵妃 送货上门",
        price: "120.00",
        time_money: "356.58",
        original_cost: "345",
        goods_tag: "2",
        count: "123"
      },
      {
        id: "4",
        img_url: "/static/img/a1.jpg",
        name: "海南贵妃特价海南贵妃 送货上门",
        price: "120.00",
        time_money: "356.58",
        original_cost: "345",
        goods_tag: "2",
        count: "124"
      },
      {
        id: "5",
        img_url: "/static/img/a1.jpg",
        name: "海南贵妃特价海南贵妃 送货上门",
        price: "120.00",
        time_money: "356.58",
        original_cost: "345",
        goods_tag: "1",
        count: "125"
      },
      {
        id: "6",
        img_url: "/static/img/a1.jpg",
        name: "海南贵妃特价海南贵妃 送货上门",
        price: "120.00",
        time_money: "356.58",
        original_cost: "345",
        goods_tag: "1",
        count: "126"
      },
      {
        id: "7",
        img_url: "/static/img/a1.jpg",
        name: "海南贵妃特价海南贵妃 送货上门",
        price: "120.00",
        time_money: "356.58",
        original_cost: "345",
        goods_tag: "2",
        count: "126"
      },
      {
        id: "8",
        img_url: "/static/img/a1.jpg",
        name: "海南贵妃特价海南贵妃 送货上门",
        price: "120.00",
        time_money: "356.58",
        original_cost: "345",
        goods_tag: "1",
        count: "126"
      }
    ];
  }
};
</script>

<style scoped>
.flash_sale {
  margin-top: 15px;
}
.swiper-slide {
  width: 109px;
}
.swiper_slide {
  height: 214px;
  width: 100px;
  text-align: left;
}
.swiper-slide:first-child {
  height: 100%;
  margin-left: 9px;
}
.a_detail {
  text-decoration: none;
}
.image_border {
  height: 100px;
  width: 100px;
  border-radius: 10px;
  position: relative;
}
.image_border .swiper_goods_tag {
  position: absolute;
  top: 0;
  left: 5px;
  width: 25px;
  height: 26px;
  background-position: 0 0;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  color: aliceblue;
}
.image_border .swiper_goods_tag span {
  position: absolute;
  top: -4px;
  left: 0;
  height: 26px;
  width: 25px;
  font-size: 8px;
  transform: scale(0.7,0.65);
}
.isGreenGoodsTag {
  background-image: url("/static/img/buy_star_icon.png");
}
.isBlackGoodsTag {
  background-image: url("/static/img/buy_end_icon.png");
}
.image_border img {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
.swiper_name {
  height: 32px;
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
.swiper_del_price {
  margin: 0;
  font-size: 9px;
  color: #9b9b9b;
}
.last_explain {
  height: 28px;
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: Center;
}
.last_explain span {
  width: 25%;
  font-size: 12px;
  color: #5f5f5f;
  position: relative;
  margin-left: 20px;
}
.last_explain span i {
  display: inline-block;
  width: 13px;
  height: 13px;
  position: absolute;
  top: 2px;
  left: -5px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.view_more {
  height: 185px;
  width: 100px;
  border: 1px solid #eee;
}
.a_detail {
  text-decoration: none;
  color: #9b9b9b;
}
.view_more p:first-child {
  font-size: 13px;
  color: #f10215;
  width: 55px;
  margin: 42px 0 0 22px;
  padding: 0 0 5px 0;
  border-bottom: 1px solid #f10215;
}
.view_more p:last-child {
  font-size: 11px;
  width: 100px;
  margin: 0;
  padding: 5px 0 0 0;
}
</style>


