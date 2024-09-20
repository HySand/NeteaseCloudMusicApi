// 热门搜索
import { get } from '@vercel/edge-config';

module.exports = async (query, request) => {
  const c1 = await get('__csrf');
  const c2 = await get('MUSIC_U');
  const c3 = await get('NMTID');
  query.cookie.__csrf = c1;
  query.cookie.MUSIC_U = c2;
  query.cookie.NMTID = c3;
  const data = {
    type: 1111,
  }
  return request('POST', `https://music.163.com/weapi/search/hot`, data, {
    crypto: 'weapi',
    uaType: 'mobile',
    cookie: query.cookie,
    ua: query.ua || '',
    proxy: query.proxy,
    realIP: query.realIP,
  })
}
