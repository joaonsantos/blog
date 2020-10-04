const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  entry: ['react-hot-loader/patch', './src'],
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    publicPath: '/dist/',
    historyApiFallback: true,
    hotOnly: true,
    host: '127.0.0.1',
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        secure: false
      }
    }
  }
})
