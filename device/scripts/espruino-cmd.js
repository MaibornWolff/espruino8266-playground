const config = require('../config');
const { fork } = require('child_process');

const args = process.argv.slice(2);
if (args.lengh === 0) {
  throw new Error('[espruino-run-cmd] No arguments given.')
}
fork(
  require.resolve('espruino/bin/espruino-cli'),
  ['--board', config.board, '-b', config.baudRate, '--port', config.port, ...args],
  { cwd: '.' }
).on('close', process.exit);
