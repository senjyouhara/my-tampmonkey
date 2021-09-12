const path = require('path');
const fs = require('fs-extra')
const config = require('./base.config');
const generateMeta = require('../utils/generate-meta');

function checkBuildDir(buildDir) {
    const rootStat = fs.existsSync(buildDir);
    !rootStat && fs.mkdirSync(buildDir)
}
const pathSplit = process.cwd().split(path.sep)
const cwd = process.cwd()

let name = process.argv[process.argv.length - 1];
let PACKAGES_PATH = path.resolve(__dirname, '../../', 'packages');

const isRootDir = fs.existsSync(path.resolve(process.cwd(), 'packages'))

  // 子包目录
if(!isRootDir){
  name = pathSplit[pathSplit.length - 1]
  PACKAGES_PATH = path.resolve(cwd, '../')
}

let root = path.resolve(PACKAGES_PATH, '../')
const buildDir = path.resolve(root, 'build')

const packages = fs.readdirSync(PACKAGES_PATH).filter(item => !item.startsWith('.'));

function beforeCheck() {

  let packageDir = path.resolve(__dirname, "../../")

  if(!isRootDir){
    packageDir = cwd
  }

  const packageBuild = path.resolve(packageDir, "build")
  fs.removeSync(packageBuild)
  checkBuildDir(packageBuild)

    fs.removeSync(path.resolve(buildDir, name))
    checkBuildDir(buildDir)

    return {
        packageDir,
        packageBuild,
    }

}



function webpackConfigHandler(isDev) {

    const configData = beforeCheck()
    // 读取版本号
    const package = JSON.parse(fs.readFileSync(path.resolve(configData.packageDir, 'package.json')));


    const metaStat = fs.existsSync(path.resolve(configData.packageDir, 'meta.yml'))
    let meta = null
    if(metaStat){
        // 读取配置，生成注释
         meta = generateMeta(path.resolve(configData.packageDir, 'meta.yml'), {
            version: package.version,
            updateURL: `https://userscript.firefoxcn.net/js/${name}.meta.js`,
            downloadURL: `https://userscript.firefoxcn.net/js/${name}.user.js`
        });
    }

    const c = config({
        root,
        packageDir: configData.packageDir,
        name,
        meta: meta && meta.text,
        output: configData.packageBuild,
        isDev,
    });

    if (fs.existsSync(path.resolve(configData.packageDir, 'webpack.overwrite.js'))) {
        require(path.resolve(configData.packageDir, 'webpack.overwrite.js'))(c);
    }

    return c
}


module.exports = {
    PACKAGES_PATH,
    packages,
    root,
    buildDir,
    packageBuild(){
      return path.resolve(PACKAGES_PATH, name, 'build')
    },
    webpackConfigHandler,
}
