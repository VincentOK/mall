import fetch from '../config/fetch'


export const test = (teacherId) => fetch('share/shareTeacherInfo',{
  teacherId:teacherId
},'POST');

export const getList = (pageNumber) => fetch('/timestore/storeTimecoin/listTop',{
  pageNumber:pageNumber
},'POST');


// export const searchplace = (callback) => fetch('announce/findann', callback);

