import fetch from '../config/fetch'


export const getList = (pageNumber) => fetch('storeTimecoin/listTop',{
  pageNumber:pageNumber
},'POST');


// export const searchplace = (callback) => fetch('announce/findann', callback);

