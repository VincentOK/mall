import fetch from '../config/fetch'


export const getList = (pageNumber) => fetch('storeTimecoin/listTop',{
  pageNumber:pageNumber
},'POST',false);

/**
 * 现金专区/时间币专区
 * type：1：代表现金专区2：代表时间币专区(*)
 * pageNumber：页码(*)
 */
export const getCashList = (type,pageNumber) => fetch('/storeTimecoin/listCommodity',{
  type:type,
  pageNumber:pageNumber
},'POST',false);

/**
 * 限时抢购
 * pageSize：页码(*)
 * pageNumber：每页数量
 */
export const getFlash = (pageSize,pageNumber) => fetch('/commodity/getLimitLimeCommodity',{
  pageSize:pageSize,
  pageNumber:pageNumber
},'GET',false);


/**
 * 新增收货地址
 * uid:用户id
 * shippingAddress:收货地址(*)
 * shippingName：收货人姓名(*)
 * shippingPhone：收货人电话(*)
 * detailAddress：详细收货地址(*)
 */
export const  addAddress= (uid,shippingAddress,shippingName,shippingPhone,detailAddress) => fetch('/order/addAddress',{
  uid:uid,
  shippingAddress:shippingAddress,
  shippingName:shippingName,
  shippingPhone:shippingPhone,
  detailAddress:detailAddress
},'POST')


/**
 * 商品详细信息
 * type:商品类型(*)
 * commodityId：商品id(*)
 * uid：用户id
 */
export const getDetail = (type,commodityId,uid) => fetch('/storeTimecoin/getDetail',{
  type:type,
  commodityId:commodityId,
  uid:uid
},'POST')


/**
 * 获取我的订单
 * status: 状态(*)
 * uid：用户id(*)
 * pageNumber:页码(*)
 * pageSize:每页行数
 */
export const getOrder = (status,uid,pageNumber,pageSize) => fetch('/order/list',{
  status:status,
  uid:uid,
  pageNumber:pageNumber,
  pageSize:pageSize
},'POST',false)
// export const searchplace = (callback) => fetch('announce/findann', callback);

