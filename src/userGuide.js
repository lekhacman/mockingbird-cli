module.exports = function userGuide(commands) {
  return `Syntax: 
\tmockingbird <command>
Commands: 
  ${commands.reduce(function (str, command) {
    str += `\t- ${command}\n`;
    return str;
  }, '')}
Example: mockingbird build
`;
};
