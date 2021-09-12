const webpack = require('webpack');
const WebpackDevServer = require("webpack-dev-server")
const path = require('path');
const {exec} = require('./utils/childProcess');
const terminal = require('./utils/terminal');
const {webpackConfigHandler, packageBuild} = require('./config/config')

const main = async function () {

    const devServe = {
        https: false,
        compress: true,
        inline: true,
        hot: true,
        overlay: true,
        host: "0.0.0.0",
        port: 9000,
        publicPath: "/",
        disableHostCheck: true,
        contentBase: packageBuild()
    }

    const webpackConfig = webpackConfigHandler(true);

    const complier = webpack(webpackConfig);
    const devServer = new WebpackDevServer(complier, devServe)

    devServer.listen(devServe.port, devServe.host, err => {
        if (err) {
            return console.log(err)
        }
    })

}

main();
