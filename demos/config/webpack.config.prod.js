const webpack = require('webpack');
const path = require('path');
const BUILD_DIR = path.resolve(__dirname, '../dist');
const APP_DIR = path.resolve(__dirname, '../src');
const APP_SRC = path.resolve(__dirname, '../../src');
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const autoprefixer = require('autoprefixer');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
  bail: true,
  devtool: false,
  entry: {
    polyfills: require.resolve('./polyfills'),
    index: APP_DIR + '/index.js',
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].[chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [APP_DIR, APP_SRC],
        loader: 'babel-loader',
        options: {
          compact: true,
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
        },
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract([
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              minimize: true,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
          {
            loader: 'sass-loader',
          },
        ]),
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
              name: '[name].[hash:8].[ext]',
              // publicPath: 'imgs/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new UglifyJSPlugin(),
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin('styles.css'),
    new CopyWebpackPlugin([{ from: PUBLIC_DIR, to: BUILD_DIR }]),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../index.html'),
    }),
  ],
};

module.exports = config;
