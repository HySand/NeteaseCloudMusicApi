// 歌曲链接
import { get } from '@vercel/edge-config';

module.exports = async (query, request) => {
  const c1 = await get('__csrf');
  const c2 = await get('MUSIC_U');
  const c3 = await get('NMTID');
  query.cookie('__csrf', c1);
  query.cookie('MUSIC_U', c2);
  query.cookie('NMTID', c3);
  query.cookie.os = 'pc'
  const ids = String(query.id).split(',')
  const data = {
    ids: JSON.stringify(ids),
    br: parseInt(query.br || 999000),
  }
  const res = await request(
    'POST',
    `https://interface3.music.163.com/eapi/song/enhance/player/url`,
    data,
    {
      crypto: 'eapi',
      cookie: query.cookie,
      ua: query.ua || '',
      proxy: query.proxy,
      realIP: query.realIP,
      url: '/api/song/enhance/player/url',
    },
  )
  // 根据id排序
  const result = res.body.data
  result.sort((a, b) => {
    return ids.indexOf(String(a.id)) - ids.indexOf(String(b.id))
  })
  return {
    status: 200,
    body: {
      code: 200,
      data: result,
    },
  }
}
