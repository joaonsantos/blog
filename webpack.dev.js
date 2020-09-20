const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  entry: ['react-hot-loader/patch', './src'],
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    historyApiFallback: true,
    publicPath: '/dist/',
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        secure: false
      }
    },
    hotOnly: true
  }
})
