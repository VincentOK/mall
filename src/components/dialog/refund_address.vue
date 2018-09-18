<template>
    <div>
      <div class="wai_address"></div>
      <div class="nei_address">
        <p class="address_title">请将商品按一下路径寄还至商家</p>
        <div class="address_name">
          <div class="address_name_left">
            <p> 收件人:</p>
            <p>收件地址:</p>
            <p>联系电话:</p>
          </div>
          <div class="address_name_right">
            <p>黄剑锋</p>
            <p>金牛官场天刹暴风萨达萨达</p>
            <p>18376614866</p>
          </div>
        </div>
        <div class="ok_btn">
          我知道了
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "refund_address"
    }
</script>

<style scoped>
  .ok_btn{
    background-color: #f10215;
    color: white;
    height: 44px;
    line-height: 44px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .address_name p{
    margin: 10px 0;
  }
  .address_title{
    font-size: 14px;
    color: #333333;
    margin: 14px 0;
  }
  .nei_address{
    background-color: white;
    position: absolute;
    z-index: 99999999999;
    width: 300px;
    left: 37.5px;
    border-radius: 5px;
  }
  .address_name{
    display: flex;
  }
  .address_name_left{
    flex: 2;
    text-align: right;
  }
  .address_name_right{
    flex: 4;
    text-align: left;
  }
  .wai_address{
    position: absolute;
    top: 0;
    z-index: 9999999999;
    background-color: black;
    opacity: 0.5;
    height: 100%;
    width: 100%;
  }
</style>
