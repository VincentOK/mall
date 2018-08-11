<!--弹框提示-->
<template>
  <div>
  <div class="wai"  v-if="displayNone">
    <div class="mydialog">
        <img src="/static/img/prompt.png" alt="">
        <div>{{tismsg}}</div>
    </div>
  </div>
  <div class="prize_dialog"  v-if="prizedialog">
    <div class="prize_mydialog" @click="prizedialog = false">
        <img src="/static/img/lucky_dialog.png" alt="">
        <p>领奖信息已提交<br>快递员将在近期为您送上奖品！</p>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "mydialog",
  props: ["dialogblock", "prizeDialog"],
  data() {
    return {
      displayNone: false,
      tismsg: "",
      prizedialog: false,
      prizeMsg: ""
    };
  },
  watch: {
    dialogblock: function(newVal, oldVal) {
      this._protypeJs.addBodyHeight();
      console.log("aaaaaaaaaa" + JSON.stringify(newVal));
      console.log("bbbbbbbbbbbb" + JSON.stringify(oldVal));
      this.displayNone = newVal.flag;
      this.tismsg = newVal.msg;
      if (newVal.flag) {
        this.hiddenDialog();
      }
    },
    prizeDialog: function(newVal, oldVal) {
      console.log("aaaaaaaaaa" + JSON.stringify(newVal));
      console.log("bbbbbbbbbbbb" + JSON.stringify(oldVal));
      this.prizedialog = newVal.flag;
      this.prizeMsg = newVal.msg;
      if (newVal.flag) {
        this.hiddenDialog();
      }
    }
  },
  methods: {
    hiddenDialog: function() {
      let vm = this;
      clearTimeout(time);
      let time = setTimeout(function() {
        vm.displayNone = false;
        vm.prizedialog = false;
        vm._protypeJs.removeBodyHeight()
      }, 2000);
    }
  }
};
</script>

<style scoped>
.wai,
.prize_dialog{
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  bottom: 0;
  z-index: 99999;
}
.mydialog {
  width: 168px;
  height: 110px;
  background-color: black;
  opacity: 0.5;
  color: white;
  border-radius: 8px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.mydialog img {
  margin-top: 16px;
  width: 37px;
}
.mydialog div {
  margin: 0;
  color: white;
  padding: 18px 0 20px 0;
  font-size: 16px;
}
.prize_mydialog{
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  position: absolute;
  left: 0;
  right: 0;
}
.prize_mydialog img,p{
  width: 260px;
  height: 146px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -130px;
  margin-top: -124px;
}
.prize_mydialog p {
  /* position: absolute;
  top: 50%;
  left: 50%;
  width: 260px;
  height: 100px;
  margin-left: -130px;
  margin-top: -124px; */
  line-height: 25px;
  font-size: 14px;
  color: rgb(51, 51, 51);
  padding-top: 30px;
  letter-spacing: 1px;
}
</style>
