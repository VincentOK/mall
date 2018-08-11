import fetch from '../config/fetch'


export const test = (teacherId) => fetch('share/shareTeacherInfo',{
  teacherId:teacherId
},'POST');


// export const searchplace = (callback) => fetch('announce/findann', callback);

