const webpack = require('webpack');
const config = require('./utils/webpack.config');
const WebpackDevServer = require("webpack-dev-server")
const generateMeta = require('./utils/generate-meta');
const { readFileSync, existsSync } = require('fs');
const path = require('path');
const { exec } = require('./utils');
const terminal = require('./utils/terminal');

const name = process.argv[process.argv.length - 1];

const main = async function() {
  const root = path.resolve(__dirname, '..', name);

  // 检查有没有安装依赖
  if (!existsSync(path.resolve(root, 'node_modules'))) {
    await exec("cd " + root + " && yarn install --frozen-lockfile");
  }

  // 读取版本号
  const package = JSON.parse(readFileSync(path.resolve(root, 'package.json')));
  // 读取配置，生成注释
  const meta = generateMeta(path.resolve(root, 'meta.yml'), {
    version: package.version,
    updateURL: `https://userscript.firefoxcn.net/js/${name}.meta.js`,
    downloadURL: `https://userscript.firefoxcn.net/js/${name}.user.js`
  });

  const webpackConfig = config({
    name,
    meta: meta.text,
    output: path.join(root, 'build'),
    isDev: true,
  });

  if (existsSync(path.resolve(root, 'webpack.overwrite.js'))) {
    require(path.resolve(root, 'webpack.overwrite.js'))(webpackConfig);
  }

  const devServe = {
    https: false,
    compress: true,
    inline: true,
    hot: true,
    overlay: true,
    host: "0.0.0.0",
    port: 9000,
    publicPath:"/",
    disableHostCheck: true,
    contentBase: path.join(root, 'build')

  }

  const complier = webpack(webpackConfig);
  const devServer = new WebpackDevServer(complier, devServe)

  devServer.listen(devServe.port, devServe.host, err => {
    if (err) {
      return console.log(err)
    }
  })

  // complier.watch({}, (err, stats) => {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     // 遍历结果，输出错误
  //     for (const module of stats.compilation.modules) {
  //       if (module.errors && module.errors.length > 0) {
  //         module.errors.forEach(error => {
  //           console.error(error.message);
  //         });
  //         return;
  //       }
  //     }
  //     terminal.assets(stats.compilation.assets);
  //   }
  // });
}

main();
