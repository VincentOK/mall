let formatMoney = (value, statusId) => {
        let values = Number(value) / 100;
        let hasdot = String(values).indexOf('.') > 0
        switch (statusId) {
            case "1":
                return hasdot ? "￥" + String(values).substr(0, String(values).indexOf(".") + 3) : "￥" + values.toFixed(1);;
                break;
            case "2":
                return hasdot ? String(values).substr(0, String(values).indexOf(".") + 3) + "时间币" : values.toFixed(1) + "时间币";
                break;
            default:
                return hasdot ? String(values).substr(0, String(values).indexOf(".") + 3) : values.toFixed(1);
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
export { formatMoney, formatGoodTags }
