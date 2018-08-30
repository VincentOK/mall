import fetch from '../config/fetch'

/**
 * 首页为您推荐列表
 * pageNumber:页码（*）
 * goodsPageSize：现金商品每页个数
 * timeCoinPageSize：时间币商品每页个数
 */
export const getIndexList = (pageNumber) => fetch('storeTimecoin/listTop',{
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
export const getOrder = (status,uid,pageNumber,pageSize) => fetch('order/list',{
  status:status,
  uid:uid,
  pageNumber:pageNumber,
  pageSize:pageSize
},'POST',false)


  /**
 * 抽奖专区
 */
/**
 * 抽奖活动信息
 * luckyId:活动id(*)
 */
export const getLuckyList = (luckyId) => fetch('storeLucky/listLucky',{
  luckyId:luckyId
},'POST',false);


/**
 * 获取领奖中心奖品信息
 * prizeId:奖品id(*)
 * uid:用户id（*）
 */
export const getPrizeInfo = (prizeId,uid)=>fetch('storeLucky/getPrizeInfo',{
  prizeId:prizeId,
  uid:uid
},'POST');

/**
 * 抽奖
 * uid：用户id（*）
 * luckyId：抽奖活动id（*）
 * expend：消耗时间币
 */
export const getlucky = ({uid,luckyId,expend})=>fetch('storeLucky/lucky',{
  uid:uid,
  luckyId:luckyId,
  expend:expend
},'POST',false);
/**
 * 统计抽奖次数
 * uid：用户id（*）
 */
export const getcountUserLuckyNumber = (uid)=>fetch('storeLucky/countUserLuckyNumber',{
  uid:uid,
},'POST',false)

/**
 * 上传blob格式图片
 * blob：图片blob路径
 */
export const uploadBlobImg = (photoFile)=>fetch('order/uploadImages',photoFile,'POST',true,{headers: {'Content-Type': 'multipart/form-data;'}})


/**
 * 提交退款申请
 * uid：用户id(*)
 * orderNumber：订单号(*)
 * commodityId：商品id(*)
 * reason：退款原因(*)
 * describes：问题描述
 * imgUrl：图片files对象数组
 */
export const addRedund = (uid,orderNumber,commodityId,reason,describes,photoFile)=>fetch('order/addRefund',{
  uid:uid,
  orderNumber:orderNumber,
  commodityId:commodityId,
  reason:reason,
  describes:describes,
  targetPath:photoFile
},'POST')
/**
 * 查询中奖公告
 * luckyId：活动id（*）
 */
export const getSelectNotice = (luckyId)=>fetch('storeLucky/selectNotice',{
  luckyId:luckyId,
},'POST',false)


/**
 * 确认收货
 * orderNumber：订单号（*）
 */
export const sureRefund = (orderNumber)=>fetch('order/confirmGoods',{
  orderNumber:orderNumber,
},'POST')
// export const searchplace = (callback) => fetch('announce/findann', callback);

