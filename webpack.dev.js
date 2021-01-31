const path = require('path')
const { merge } = require("webpack-merge");
const common = require('./webpack.common.js')
const { WebpackPluginServe } = require('webpack-plugin-serve')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = merge(common, {
  watch: true,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    esmodules: true
                  }
                }
              ],
              [
                '@babel/preset-react',
                {
                  development: true,
                  runtime: 'automatic',
                  importSource: 'react'
                }
              ]
            ]
          }
        }
      }
    ]
  },
  entry: ['./src', 'webpack-plugin-serve/client'],
  devtool: 'inline-source-map',
  plugins: [
    new WebpackPluginServe({
      host: '127.0.0.1',
      port: process.env.PORT || 3000,
      static: path.join(__dirname, 'dist/'),
      open: true,
      progress: 'minimal',
      ramdisk: true,
      hmr: 'refresh-on-failure',
      liveReload: false,
      waitForBuild: true,
      historyFallback: true,
      middleware: (app, builtins) => {
        app.use(builtins.proxy('/api', { target: 'http://localhost:8000' }))
      }
    }),
    new ReactRefreshWebpackPlugin()
  ]
})
