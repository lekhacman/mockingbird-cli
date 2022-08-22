const createCommander = require('./createCommander');
const userGuide = require('./userGuide');
const { COMMAND } = require('./constants');
const parseArgv = require('./parseArgv');

const commander = createCommander();
process.title = COMMAND;

const { command } = parseArgv(process.argv);
if (commander.has(command)) {
  commander.exec(command);
} else {
  console.log(userGuide(commander.list()));
}
