const parseArgv = require('./parseArgv');
describe('parseArgv', function () {
  const cases = [
    {
      name: 'should parse within repo',
      input: ['node', './src/mockingbird', 'build'],
      want: { command: 'build' },
    },
    {
      name: 'should parse on scripts',
      input: ['mockingbird', 'logs'],
      want: { command: 'logs' },
    },
  ];

  cases.forEach(function ({ name, input, want }) {
    it(name, function () {
      expect(parseArgv(input)).toEqual(want);
    });
  });
});
