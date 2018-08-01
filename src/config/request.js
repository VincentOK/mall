import fetch from '../config/fetch'


export const cityGuess = () => fetch('/v1/cities', {
  type: 'guess'
});

export const hotcity = () => fetch('/v1/cities', {
  type: 'hot'
});
export const searchplace = (cityid, value) => fetch('/v1/pois', {
  type: 'search',
  city_id: cityid,
  keyword: value
});

