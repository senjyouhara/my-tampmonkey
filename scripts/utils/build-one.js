const webpack = require('webpack');
const { readFileSync, existsSync } = require('fs');
const path = require('path');
const { exec } = require('./childProcess');
const { webpackConfigHandler } = require('../config/config')

module.exports = function(name) {
  return new Promise(async (resolve, reject) => {

    const webpackConfig = webpackConfigHandler()
    const complier = webpack(webpackConfig);

    complier.run((err, stats) => {
      if (err) {
        reject(err);
        return;
      }
      // 遍历stats，检查有没有错误
      for (const module of stats.compilation.modules) {
        if (module.errors && module.errors.length > 0) {
          reject(module.errors);
          return;
        }
      }
      resolve({ name, stats });
    });
  });
}
