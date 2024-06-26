#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const tmpPath = require('os').tmpdir()
const storage = require('node-persist');

async function start() {
  // 检测是否存在 anonymous_token 文件,没有则生成
  if (!fs.existsSync(path.resolve(tmpPath, 'anonymous_token'))) {
    fs.writeFileSync(path.resolve(tmpPath, 'anonymous_token'), '', 'utf-8')
  }
  // 启动时更新anonymous_token
  const generateConfig = require('./generateConfig')
  await generateConfig()
  require('./server').serveNcmApi({
    checkVersion: true,
  })
  // 初始化 node-persist
  storage.init({
    dir: './persist', // 存储文件的目录
    stringify: JSON.stringify,
    parse: JSON.parse,
    encoding: 'utf8',
    logging: false, // 是否启用日志
    continuous: true, // 是否实时写入
    interval: false, // 实时写入的时间间隔
    ttl: false // 数据的存活时间（毫秒）
  });
}
start()
