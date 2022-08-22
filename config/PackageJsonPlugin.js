function PackageJsonPlugin() {}

PackageJsonPlugin.prototype.apply = function (compiler) {
  compiler.hooks.emit.tapPromise(
    'PackageJsonPlugin',
    emit.bind(this, compiler.webpack.sources)
  );
};

const toBeRemoved = [
  'dependencies',
  'devDependencies',
  'eslintConfig',
  'scripts',
];
function emit({ RawSource }, compilation) {
  return new Promise((resolve) => {
    compilation.inputFileSystem.readFile('package.json', function (err, data) {
      const packageJson = JSON.parse(data.toString());
      toBeRemoved.forEach((key) => {
        delete packageJson[key];
      });
      resolve(
        compilation.emitAsset(
          'package.json',
          new RawSource(JSON.stringify(packageJson))
        )
      );
    });
  });
}

module.exports = PackageJsonPlugin;
