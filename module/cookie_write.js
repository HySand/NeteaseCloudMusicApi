const storage = require('../app'); // 根据实际路径调整

async function writeUserCookie(cookie) {
  await storage.setItem('cookie', cookie);
}

module.exports = {
  writeUserCookie,
};
