<!--未中奖-->
<template>
  <div v-show="close">
    <div class="notwinning_out"></div>
    <div class="notwinning_in">
      <img @click="closePage" class="notwinning_close" src="/static/img/close.png" alt="">
      <div class="notwinning_bg">
        <p class="notwining_title">哎呀，差那么一点点~</p>
        <p class="notwinining_word">别灰心，再来一次</p>
        <img class="notwinning_img" src="/static/img/notwin.png" alt="">
        <button class="notwinning_again" @click="closePage">再抽一次</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getcountUserLuckyNumber } from "../../config/request";
export default {
  name: "notwinning",
  data() {
    return {
      uId: "",
      close: true,
      whetherFreeCount: null
    };
  },
  props: {
    isShowPopup: Boolean
  },
  watch: {
    isShowPopup(newVal, oldVal) {
      if (newVal) {
        this._protypeJs.addBodyHeight();
      }
    }
  },
  mounted() {
    this.uId = this._protypeJs.getUserId();
  },
  methods: {
    closePage() {
      let self = this;
      self.close = false;
      getcountUserLuckyNumber(self.uId)
        .then(res => {
          self.whetherFreeCount = res;
          console.log(self.whetherFreeCount);
          self.$emit("toDraw", self.whetherFreeCount);
        })
        .catch(err => {
          console.log(err);
        });
      self._protypeJs.removeBodyHeight();
    }
  }
};
</script>

<style scoped>
.fixed_mask {
  overflow: hidden;
}
.notwinning_out {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background-color: black;
  opacity: 0.5;
}
.notwinning_in {
  z-index: 9999;
  position: absolute;
  left: 0;
  right: 0;
  top: 100px;
  margin: auto;
  width: 276px;
}
.notwinning_close {
  width: 24px;
  height: 35.5px;
  display: block;
  margin-left: 230px;
}
.notwinning_bg {
  background-image: url("/static/img/notwin_bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 276px;
  height: 287px;
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
  margin-top: 30px;
}
</style>
