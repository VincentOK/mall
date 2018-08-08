<template>
  <div id="app" class="container"  v-touch:swiperight="methodFunc">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
    }
  },
  computed:{
    // activated: function () {
    //   this.$setgoindex()
    // }
  },
  methods: {
    methodFunc:function (e) {
      console.log("========"+window.location.href)

      // if (this.$route.query.goindex === 'true') {
      //   this.$router.push('/')
      // } else {
      //   this.$router.back(-1)
      // }
      // if (window.history.length <= 1) {
      //   this.$router.push({path:'/'})
      //   return false
      // } else {
      //   this.$router.go(-1)
      // }
      // //上面都没执行就说明卡在当前页不是最后一条， histroy记录数量大于1，又没有回退记录，只能返回首页，
      // //如果上面都执行了 页面都跳走了，这个也就不用管了
      // setTimeout(() => {
      //   this.$router.push({path:'/'})
      // },500)
      // this.$router.go(-1)
    }
  }
}
</script>

<style>
  body {
    background-color: #ffffff;
  }
  .container{
    width:100%;
    height:100%
  }
  #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  font-size: 13px;
}
.null_div{
  height: 10px;
  width: 100%;
  background-color: #f4f4f4;
}
</style>
