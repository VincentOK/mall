<!--中奖-->
<template>
  <div v-show="close" :class="{noScroll: isShowPopup}">
    <div class="notwinning_out"></div>
    <div class="notwinning_in">
      <div class="winning_postion">
        <img @click="closePage" class="notwinning_close" src="/static/img/close.png" alt="">
        <img class="winning_bg" src="/static/img/flower.png" alt="">
      </div>
      <div class="notwinning_bg">
        <p class="notwining_title">恭喜您中奖啦！</p>
        <img class="notwinning_img" src="/static/img/win.png" alt="">
        <p class="winning_word">越南小紫薯新鲜先挖x1</p>
        <router-link :to="'/luckycenter'">
          <button class="notwinning_again" @click="closePage">去领奖</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "winning",
  data() {
    return {
      close: true,
    };
  },
  props: {
    isShowPopup:Boolean
  },
  methods: {
    closePage() {
      this.close = false;
      this.$emit("toDraw", null);
      this._protypeJs.removeBodyHeight();
    }
  },
   watch: {
    isShowPopup(newVal, oldVal) {
      if (newVal) {
      this._protypeJs.addBodyHeight();
      }
      // 下面需要这两行代码，兼容不同浏览器
      document.body.scrollTop = this.pageScrollYoffset;
      window.scroll(0, this.pageScrollYoffset);
    }
   },
  mounted(){
  }
};
</script>

<style scoped>
.notwinning_out {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background-color: black;
  opacity: 0.5;
}
.winning_bg {
  position: absolute;
  top: 0;
  left: -265px;
  width: 345px;
  height: 101px;
  margin: auto;
  z-index: 1;
}
.winning_word {
  font-size: 14px;
  margin: 0;
  padding: 20px 0;
}
.winning_postion{
  position: relative;
  width: 24px;
  height: 35.5px;
  margin-left: 230px;
}
.notwinning_in {
  position: absolute;
  left: 0;
  right: 0;
  top: 10%;
  margin: auto;
  width: 276px;
}
.notwinning_close {
  position: absolute;
  width: 24px;
  height: 35.5px;
  display: block;
  z-index: 2;
}
.notwinning_bg {
  background-image: url("/static/img/notwin_bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 276px;
  height: 310px;
  margin: auto;
}
.notwining_title {
  margin: 0;
  font-size: 22px;
  padding: 10px;
  color: white;
}
.notwinining_word {
  font-size: 15px;
}
.notwinning_img {
  width: 115px;
  display: block;
  margin: auto;
  margin-top: 31px;
}
.notwinning_again {
  width: 145px;
  height: 37px;
  line-height: 37px;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  background-color: #f10215;
}
</style>
