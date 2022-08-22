const { spawnSync, spawn } = require('child_process');

const imageName = 'lekhacman/mockingbird:latest';

module.exports = function createCommander() {
  const name = process.env.npm_package_name;
  const port = process.env.npm_package_port;
  if (!port) {
    console.log('Please config port in package.json');
  } else {
    console.log(`${name} : http://localhost:${port}`);
  }

  function clean() {
    console.log('Cleanup old image');
    spawnSync('docker', ['stop', name]);
    spawnSync('docker', ['rm', name]);
  }

  function run() {
    console.log(`Run image:\t${name} at port ${port}`);
    spawnSync('docker', [
      'run',
      '--name',
      name,
      '-d',
      '-p',
      `${port}:${port}`,
      '--mount',
      `type=bind,src=${process.cwd()},dst=/app`,
      imageName,
    ]);
    console.log(`Container ${name} is starting at http://localhost:${port}`);
  }

  function docker([command, ...rest]) {
    return () => {
      console.log(
        `${command} : ${spawnSync('docker', [command, ...rest]).output}`
      );
    };
  }

  function log() {
    spawn('docker', ['log', '-f', name]).stdout.pipe(process.stdout);
  }

  const commands = {
    build: function () {
      clean();
      run();
    },
    start: docker(['start', name]),
    stop: docker(['stop', name]),
    restart: docker(['restart', name]),
    log,
    clean,
  };

  function has(command) {
    return commands.hasOwnProperty(command);
  }

  function exec(command) {
    commands[command]();
  }

  function list() {
    return Object.keys(commands);
  }

  return { has, exec, list };
};
