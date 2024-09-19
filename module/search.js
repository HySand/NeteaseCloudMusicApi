// 搜索
import { get } from '@vercel/edge-config';

module.exports = (query, request) => {
  const c1 = await get('__csrf');
  const c2 = await get('MUSIC_U');
  const c3 = await get('NMTID');
  query.cookie.__csrf = c1;
  query.cookie.MUSIC_U = c2;
  query.cookie.NMTID = c3;
  if (query.type && query.type == '2000') {
    const data = {
      keyword: query.keywords,
      scene: 'normal',
      limit: query.limit || 30,
      offset: query.offset || 0,
    }
    return request('POST', `https://music.163.com/api/search/voice/get`, data, {
      crypto: 'weapi',
      cookie: query.cookie,
      ua: query.ua || '',
      proxy: query.proxy,
      realIP: query.realIP,
    })
  }
  query.cookie.os = 'pc'
  const data = {
    s: query.keywords,
    type: query.type || 1, // 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
    limit: query.limit || 30,
    offset: query.offset || 0,
  }
  return request('POST', `https://music.163.com/weapi/search/get`, data, {
    crypto: 'weapi',
    cookie: query.cookie,
    ua: query.ua || '',
    proxy: query.proxy,
    realIP: query.realIP,
  })
}
