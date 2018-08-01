<template>
    <div class="refund_go">
      <p>
        货品已寄回商家？是否需要商家退还您垫付的运费？
        <label v-on:click="gotoApply(id)">去申请</label>
      </p>
    </div>
</template>

<script>
    export default {
        name: "refund_title",
      data(){
          return{
            id:'',
          }
      },
      props:['getId'],
      watch:{
        getId:function (newVal,oldVal) {
          this.id = newVal
        }
      },
      methods:{
        gotoApply:function (id) {
          this.$router.push('/freight/'+id)
        }
      }
    }
</script>

<style scoped>
.refund_go p{
  font-size: 11px;
  padding-left: 13px;
  text-align: left;
  height: 30px;
  line-height: 30px;
  background-color: #f4f4f4;
  margin: 0;
}
.refund_go p label{
  float: right;
  margin-right: 19px;
  color: #ec414d;
  font-size: 10px;
}
</style>
