const terminal = require("./utils/terminal");
const { webpackConfigHandler } = require('./config/config')
const webpack = require('webpack');
const shell = require('shelljs');
const path = require('path');
const {exec} = require('child_process');

const name = process.argv[process.argv.length - 1];


function build(name) {
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
            resolve({name, stats});
        });
    });
}


build(name)
  .then((res) => {
    terminal.assets(res.stats.compilation.assets);
  })
  .catch((err) => {
    if (Array.isArray(err)) {
      err.forEach((error) => {
        console.error(error.message);
      });
    } else {
      console.error(err);
    }
    // shell.exec(`cd ../../`)
    process.exit(1);
  });
