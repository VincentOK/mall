let formatMoney = (value) => {
  return value.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')
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
