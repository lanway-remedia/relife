/**
 * @author Nam NH
 * Webpack config for production environment
 */

'use strict';

var webpack = require('webpack');
let path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var StatsPlugin = require('stats-webpack-plugin')

module.exports = require('./webpack.base')({
  entry: [
    'babel-polyfill',
    path.join(__dirname, '../app/index.js')
  ],
  output: {
    publicPath: process.env.BASENAME ? ('/' + process.env.BASENAME + '/') : '/',
    path: path.join(__dirname, '../build_prod'),
    filename: '[name]-[hash].min.js'
  },
  eslint: {
    failOnWarning: false,
    failOnError: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),

    // extracts the css from the js files and puts them on a separate .css file.
    new ExtractTextPlugin('[name]-[hash].min.css'),

    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),

    // creates a stats.json
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false
    })
  ],
  styleLoader: ExtractTextPlugin.extract(['css-loader', 'less-loader'])
})
