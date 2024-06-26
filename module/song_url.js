// 歌曲链接
const storage = require('../app');

module.exports = async (query, request) => {
  const localCookie = await getLocalCookie();
  if (localCookie) {
    query.cookie = localCookie;
  }
  
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
};

async function getLocalCookie() {
  const cookie = await storage.getItem('cookie');
  return cookie ? parseCookies(cookie) : null;
}

function parseCookies(cookies) {
  const cookieObj = {};
  cookies.forEach(cookie => {
    const parts = cookie.split(';')[0].split('=');
    cookieObj[parts[0].trim()] = parts[1].trim();
  });
  return cookieObj;
}
