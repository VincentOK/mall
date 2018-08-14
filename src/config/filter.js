let formatMoney = (value, statusId) => {
  let hasdot = value.indexOf('.') > 0
  switch (statusId) {
    case "1":
      return hasdot ? "￥" + value.substr(0,value.indexOf(".")+3) : "￥" + value;
      break;
    case "2":
      return hasdot ? value.substr(0,value.indexOf(".")+3) + "时间币" : value + "时间币";
      break;
    default:
      return hasdot ? value.substr(0,value.indexOf(".")+3) : value;
  }
}
let formatGoodTags = (goodId) => {
  switch (goodId) {
    case "1":
      return "热销";
      break;
    case "2":
      return "新品";
      break;
    case "3":
      return "特价";
      break;
    default:
      return "";
  }
}
export { formatMoney,formatGoodTags }
