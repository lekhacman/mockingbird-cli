const { COMMAND } = require('./constants');
module.exports = function parseArgv(argv) {
  let i = 0;
  while (i < argv.length && !argv[i].includes(COMMAND)) {
    i++;
  }
  return { command: argv[i + 1] };
};
