<template>
  <span :class="timeStyle">{{endTimeChar}}&nbsp;<span>{{timeH}}</span>:<span>{{timeM}}</span>:<span>{{timeS}}</span></span>
</template>

<script>
export default {
  name: "timeDown",
  data() {
    return {
      timeH: "",
      timeM: "",
      timeS: "",
      flag: false
    };
  },
  mounted() {
    let time = setInterval(() => {
      if (this.flag == true) {
        clearInterval(time);
      }
      this.timeDown();
    }, 500);
  },
  props: {
    endTime: {
      type: String
    },
    endTimeChar: {
      type: String
    },
    timeStyle: {
      type: String
    }
  },
  methods: {
    timeDown() {
      const endTime = new Date(this.endTime);
      const nowTime = new Date();
      let leftTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000);
      //   let d = parseInt(leftTime / (24 * 60 * 60));
      let h = this.formate(parseInt((leftTime / (60 * 60)) % 24));
      let m = this.formate(parseInt((leftTime / 60) % 60));
      let s = this.formate(parseInt(leftTime % 60));
      if (leftTime <= 0) {
        this.flag = true;
        this.$emit("time-end",true);
        this.timeH = `00`;
        this.timeM = `00`;
        this.timeS = `00`;
      } else {
        this.timeH = h;
        this.timeM = m;
        this.timeS = s;
      }
    },
    formate(time) {
      if (time >= 10) {
        return time;
      } else {
        return `0${time}`;
      }
    }
  }
};
</script>
<style scoped>
.indexStyle {
  line-height: 49px;
  float: right;
  margin-right: 15px;
  font-size: 12px;
  color: #f10215;
}
.indexStyle span {
  color: white;
  background-color: #f10215;
  padding: 0 2px;
  margin: 0 2px;
  border-radius: 2px;
}
.snapupList{
  float: right;
  margin-right: 10px;
  font-size: 12px;
  color: #333;
}
.snapupList span {
  color: white;
  background-color: #333;
  padding: 0 2px;
  margin: 0 2px;
  border-radius: 2px;
}
</style>


