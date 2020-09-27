// webpack.config.js
const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = {
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
              '@babel/preset-react'
            ],
            plugins: [
              'react-hot-loader/babel'
            ]
          }
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          }
        ]
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'images'
        }
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
    })
  ],
  output: {
    filename: '[name].bundle.js',
    publicPath: '/dist/',
    path: path.resolve(__dirname, 'dist/')
  }
}
