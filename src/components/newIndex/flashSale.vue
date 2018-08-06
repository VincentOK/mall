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
                </div>
                </router-link>
            </div>
          </swiper-slide>
          <div class="view_more">
            <router-link class="a_detail" :to="'/snapuplist'">
              <p>查看更多</p>
              <p>view more</p>
            </router-link>
          </div>
        </swiper>
        <div class="last_explain">
            <span>扶贫商城</span>
            <span>全场包邮</span>
            <span>品质保障</span>
        </div>
    </div>
</template>

<script>
export default {
  name: "flashSale",
  data() {
    return {
      cash_list: [],
      maxLength: 15,
      swiperOption: {
        slidesPerView: "auto",
        slidesOffsetAfter: 120,
        slidesPerView: 3.5,
        loop: false,
        grabCursor: true
      }
    };
  },
  methods: {
    maxSlice(parm) {
      return parm.length > this.maxLength
        ? parm.slice(0, this.maxLength) + "..."
        : parm;
    }
  },
  filters: {
    formatMoney: function(price) {
      return "￥" + Number(price).toFixed(2);
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
        count: "121"
      },
      {
        id: "2",
        img_url: "/static/img/a1.jpg",
        name: "海南贵妃特价海南贵妃 送货上门",
        price: "120.00",
        time_money: "356.58",
        original_cost: "345",
        count: "122"
      },
      {
        id: "3",
        img_url: "/static/img/a1.jpg",
        name: "海南贵妃特价海南贵妃 送货上门",
        price: "120.00",
        time_money: "356.58",
        original_cost: "345",
        count: "123"
      },
      {
        id: "4",
        img_url: "/static/img/a1.jpg",
        name: "海南贵妃特价海南贵妃 送货上门",
        price: "120.00",
        time_money: "356.58",
        original_cost: "345",
        count: "124"
      },
      {
        id: "5",
        img_url: "/static/img/a1.jpg",
        name: "海南贵妃特价海南贵妃 送货上门",
        price: "120.00",
        time_money: "356.58",
        original_cost: "345",
        count: "125"
      },
      {
        id: "6",
        img_url: "/static/img/a1.jpg",
        name: "海南贵妃特价海南贵妃 送货上门",
        price: "120.00",
        time_money: "356.58",
        original_cost: "345",
        count: "126"
      },
      {
        id: "7",
        img_url: "/static/img/a1.jpg",
        name: "海南贵妃特价海南贵妃 送货上门",
        price: "120.00",
        time_money: "356.58",
        original_cost: "345",
        count: "126"
      },
      {
        id: "8",
        img_url: "/static/img/a1.jpg",
        name: "海南贵妃特价海南贵妃 送货上门",
        price: "120.00",
        time_money: "356.58",
        original_cost: "345",
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
.swiper_slide {
  height: 209px;
  width: 100px;
  text-align: left;
}
.swiper-slide:first-child {
  width: 29%;
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
  margin: 9px auto;
  font-size: 12px;
  color: #333;
}
.swiper_price {
  margin: 0;
  padding-bottom: 4px;
  font-size: 13px;
  color: #f10215;
}
.swiper_del_price {
  margin: 0;
  font-size: 11px;
  color: #9b9b9b;
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
.view_more {
  height: 100px;
  width: 100px;
  border: 1px solid #eee;
}
.a_detail {
  text-decoration: none;
  color: #9b9b9b;
}
.view_more p:first-child {
  font-size: 10px;
  width: 50px;
  margin: 30px 0 0 25px;
  padding: 0 0 3px 0;
  border-bottom: 1px solid #eee;
}
.view_more p:last-child {
  font-size: 9px;
  width: 100px;
  margin: 0;
  padding: 3px 0 0 0;
}
</style>


