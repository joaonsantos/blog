// webpack.config.js
const path = require('path')
const Dotenv = require('dotenv-webpack')
const { mode } = require('webpack-nano/argv')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { MiniHtmlWebpackPlugin } = require('mini-html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const headHtml = `
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="description" content="João Santos\'s Personal Blog. Code is a never ending journey."/>
<meta name="author" content="João Santos"/>
<link href="https://fonts.gstatic.com" rel="preconnect" crossorigin>
`

const bodyHtml = `
<div id="root"> </div>
<noscript>You need to enable JavaScript to run this app.</noscript>
`

module.exports = {
  mode: mode,
  entry: './src/index.js',
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
                  development: false,
                  runtime: 'automatic',
                  importSource: 'react'
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          }
        ],
        sideEffects: true
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/i,
        type: 'asset/resource'
      }
    ]
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  plugins: [
    new Dotenv({
      path: './env/.env.dev', // load this now instead of the ones in '.env'
      safe: false, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      allowEmptyValues: false, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: true, // hide any errors
      defaults: true // load '.env.defaults' as the default values if empty.
    }),
    new MiniHtmlWebpackPlugin({
      filename: 'index.html',
      context: {
        title: 'Implicitly Explicit',
        htmlAttributes: {
          lang: 'en'
        },
        head: headHtml,
        body: bodyHtml
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css'
    }),
    new CleanWebpackPlugin()
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/'),
    assetModuleFilename: 'images/[hash][ext][query]'
  }
}
