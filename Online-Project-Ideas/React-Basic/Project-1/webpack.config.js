const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: ['@babel/polyfill', './script.js'],
  output: {
    path: path.resolve(__dirname, './'),
    filename: './script1.js'
  },
  devServer: {
    contentBase: ''
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './template.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
