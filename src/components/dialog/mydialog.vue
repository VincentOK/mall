<!--弹框提示-->
<template>
  <div class="wai"  v-if="displayNone">
    <div class="mydialog">
        <img src="/static/img/prompt.png" alt="">
        <p>{{tismsg}}</p>
    </div>
  </div>
</template>

<script>
    export default {
      name: "mydialog",
      props:['dialogblock'],
      data(){
          return{
            displayNone:false,
            tismsg:''
          }
      },
      watch:{
        dialogblock: function(newVal,oldVal){
          console.log("aaaaaaaaaa"+JSON.stringify(newVal))
          console.log("bbbbbbbbbbbb"+JSON.stringify(oldVal))
          this.displayNone = newVal.flag
          this.tismsg = newVal.msg
          if(newVal.flag){
            this.hiddenDialog();
          }
        }
      },
      methods:{
        hiddenDialog:function () {
          let vm = this
          clearTimeout(time)
         let time = setTimeout(function () {
            vm.displayNone = false
          },2000)
        }
      }
    }
</script>

<style scoped>
  .wai{
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    bottom: 0;
    z-index: 99999;
  }
.mydialog{
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
  .mydialog img{
    margin-top: 16px;
    width: 37px;
  }
  .mydialog p{
    margin: 0;
    padding: 18px 0 20px 0;
    font-size: 16px;
  }
</style>
