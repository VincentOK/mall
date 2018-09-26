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
    var nameReg = /^[\u4E00-\u9FA5]{2,4}$/;
    if(nameReg.test(str)){
      return true
    }else {
      return false
    }
  },
}
