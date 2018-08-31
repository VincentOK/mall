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
    var time = setInterval(() => {
      if (this.flag == true) {
        clearInterval(time);
      }
      this.timeDown();
    }, 1000);
  },
  props: {
    endTime: {
      type: String
    },
    startTime: {
      type: String
    },
    endTimeChar: {
      type: String
    },
    timeStyle: {
      type: String
    },
    noNextData: {
      type: Boolean
    }
  },
  methods: {
    timeDown() {
      if (Boolean(this.endTime) || Boolean(this.startTime)) {
        let endTimeArr = this.endTime
          .replace(/-/g, ":")
          .replace(" ", ":")
          .split(":");
        const endTime = new Date(
          endTimeArr[0],
          endTimeArr[1] - 1,
          endTimeArr[2],
          endTimeArr[3],
          endTimeArr[4],
          endTimeArr[5]
        );
        let startTimeArr = this.startTime
          .replace(/-/g, ":")
          .replace(" ", ":")
          .split(":");
        const startTime = new Date(
          startTimeArr[0],
          startTimeArr[1] - 1,
          startTimeArr[2],
          startTimeArr[3],
          startTimeArr[4],
          startTimeArr[5]
        );
        const nowTime = new Date();
        // return (curTime>=startTime && curTime<=endTime);
        // console.log(nowTime>=startTime);
        // console.log(nowTime<=endTime)

        if (nowTime < startTime) {
          var leftTime = parseInt(
            (startTime.getTime() - nowTime.getTime()) / 1000
          );
          this.$emit("timeEnd", "starting");
        } else if (startTime <= nowTime && nowTime <= endTime) {
          var leftTime = parseInt(
            (endTime.getTime() - nowTime.getTime()) / 1000
          );
          this.$emit("timeEnd", "pendding");
        } else {
          var leftTime = 0;
          this.$emit("timeEnd", "ending");
        }
      }
      if (this.endTime == null || this.startTime == null) {
        var leftTime = -1;
      }
      var h = this.formate(parseInt((leftTime / (60 * 60)) % 24));
      var m = this.formate(parseInt((leftTime / 60) % 60));
      var s = this.formate(parseInt(leftTime % 60));
      if (leftTime < 0) {
        this.flag = true;
        // this.$emit("timeEnd", true);
        this.timeH = `00`;
        this.timeM = `00`;
        this.timeS = `00`;
      } else if (leftTime != undefined) {
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
.indexStyleBlack {
  line-height: 49px;
  float: right;
  margin-right: 15px;
  font-size: 12px;
  color: #333;
}
.indexStyleBlack span {
  color: white;
  background-color: #333;
  padding: 0 2px;
  margin: 0 2px;
  border-radius: 2px;
}
.snapupList {
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


