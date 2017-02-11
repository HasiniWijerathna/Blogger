'use strict';
const webpack = require('webpack');
// const path = require('path');
const merge = require('webpack-merge');

const utils = require('./utils');
const webpackBase = require('./webpack.base.conf');

module.exports = (config) => {
  // Output configs of production build
  const output = {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV !== 'development' ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: utils.assetsPath(config, 'js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath(config, 'js/[id].[chunkhash].js'),
  };

  // Plugins
  const plugins = [
    new webpack.DefinePlugin({
      'process.env': config.env,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ];

  return merge(webpackBase, {
    devtool: config.build.productionSourceMap ? '#source-map' : false,

    resolve: {
      extensions: ['', '.js', '.jsx'],
    },

    output,

    plugins,
  });
};
