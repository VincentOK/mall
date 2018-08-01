
export const _check = {
//校验手机号码的格式
  checkPhone:function (val) {
    console.log("校验手机号码")
    var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(val)) {
      return false;
    } else {
      return true;
    }
  },
  //校验姓名
  checkName:function (str) {
    console.log("收货名")
    var myreg = /[@#\$%\^&\*]+/g;
    if (!myreg.test(str)) {
      return true;
    } else {
      return false;
    }
  }
}
