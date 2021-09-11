const shell = require('shelljs');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const packagesPath = path.join(__dirname, '../', 'packages');

const packages = fs.readdirSync(packagesPath).filter(item => !item.startsWith('.'));
packages.forEach(pac => {
    shell.exec(`cd ${packagesPath}/${pac} && yarn link`);
});

const packagesStr = packages.map(pac => `${pac}`).join(' ');

console.log();
console.log(chalk.green('yarn link ' + packagesStr));

console.log();
console.log(chalk.yellow('yarn unlink ' + packagesStr));

console.log();
console.log(chalk.blue('yarn add ' + packagesStr));
console.log();
