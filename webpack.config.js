const webpack = require('webpack');
const PackageJsonPlugin = require('./config/PackageJsonPlugin');

module.exports = {
  mode: 'production',
  target: 'node',
  entry: {
    mockingbird: './src/index.js',
  },
  devtool: 'source-map',
  plugins: [
    new webpack.BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: true,
      entryOnly: true,
    }),
    new PackageJsonPlugin(),
  ],
};
