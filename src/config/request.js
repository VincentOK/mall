import fetch from '../config/fetch'


export const getList = (pageNumber) => fetch('storeTimecoin/listTop',{
  pageNumber:pageNumber
},'POST');

/**
 * 现金专区
 */
export const getCashList = (number) => fetch('/storeTimecoin/listCommodity',{
  type:number
},'POST',false);


// export const searchplace = (callback) => fetch('announce/findann', callback);

