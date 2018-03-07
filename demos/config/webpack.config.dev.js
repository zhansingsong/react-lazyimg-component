const webpack = require('webpack');
const path = require('path');
const BUILD_DIR = path.resolve(__dirname, '../dist');
const APP_DIR = path.resolve(__dirname, '../src');
const APP_SRC = path.resolve(__dirname, '../../src');
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

var config = {
  entry: [require.resolve('./polyfills.js'), require.resolve('../src')],
  output: {
    path: BUILD_DIR,
    filename: '[name].js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: ['./dist', PUBLIC_DIR],
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [APP_DIR, APP_SRC],
        loader: 'babel-loader',
        options: {
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
        },
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
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
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100,
              name: '[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../index.html'),
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = config;
