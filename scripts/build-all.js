const chokidar = require('chokidar');
const path = require('path');
const chalk = require('chalk');
const fs = require('fs');
const ora = require('ora');
const {exec} = require('child_process');

const PACKAGES_PATH = path.join(__dirname, '../', 'packages');
const packages = fs.readdirSync(PACKAGES_PATH).filter(item => !item.startsWith('.'));

function buildAll() {
    const spinner = ora(chalk.yellow(`build all packages...\n`)).start();
    const command = 'npm run build';
    const allCommand = packages.map(v=> `${command} ${v}`).join(" && ")
    exec(allCommand, (error, stdout, stderr) => {
        if (error) {
            spinner.fail(chalk.red(`build all packages error: ${error}`));
            return;
        }
        (stdout || '').split('\n').forEach(str => {
            str && console.log(`${str}`);
        });
        spinner.succeed(chalk.green(`all packages build success! 🎉🎉🎉`));
    });
}

buildAll()
