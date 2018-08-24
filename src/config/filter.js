let formatMoney = (value, statusId) => {
  if(Boolean(value)){
    let values = value.toString();
    let hasdot = values.indexOf('.') > 0
    switch (statusId) {
      case "1":
        return hasdot ? "￥" + values.substr(0,values.indexOf(".")+3) : "￥" + values;
        break;
      case "2":
        return hasdot ? values.substr(0,values.indexOf(".")+3) + "时间币" : values + "时间币";
        break;
      default:
        return hasdot ? values.substr(0,values.indexOf(".")+3) : values;
    }
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
