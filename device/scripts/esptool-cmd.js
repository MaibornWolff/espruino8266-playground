const config = require('../config');
const { exec } = require('child_process');

const args = process.argv.slice(2);
if (args.lengh === 0) {
  throw new Error('[espruino-run-cmd] No arguments given.')
}
exec(['esptool.py', '--port', config.port, ...args].join(' '))
  .on('close', process.exit);
