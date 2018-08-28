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
 * 现金专区
 */
export const getCashList = (number) => fetch('/storeTimecoin/listCommodity',{
  type:number
},'POST',false);


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
export const getlucky = (uid,luckyId,expend)=>fetch('storeLucky/lucky',{
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
// export const searchplace = (callback) => fetch('announce/findann', callback);

