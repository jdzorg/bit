'use strict'

const { join, resolve } = require('path')
const webpack = require('webpack')
const glob = require('glob')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

const entries = {}
const chunks = []
glob.sync('./src/pages/**/app.js').forEach(path => {
  const chunk = path.split('./src/pages/')[1].split('/app.js')[0]
  entries[chunk] = path
  chunks.push(chunk)
})

const extractCSS = new ExtractTextPlugin({
  filename: 'assets/css/[name].css',
  allChunks: true
})
const extractSASS = new ExtractTextPlugin({
  filename: 'assets/css/[name].css',
  allChunks: true
})

const config = {
  entry: entries,
  output: {
    path: resolve(__dirname, './dist'),
    filename: 'assets/js/[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      assets: join(__dirname, '/src/assets'),
      components: join(__dirname, '/src/components'),
      root: join(__dirname, 'node_modules')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve(__dirname, 'src'), resolve(__dirname, 'test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'style-loader'
            })),
            scss: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
              use: ['css-loader', 'postcss-loader', 'sass-loader'],
              fallback: 'style-loader'
            })),
            postcss: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
              use: ['css-loader', 'postcss-loader'],
              fallback: 'style-loader'
            }))
            // pug: ['pug-html-loader'].concat(ExtractTextPlugin.extract({
            //     use: ['html-loader'],
            //     fallback: 'html-loader'
            // })),
          }
        }
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          use: ['css-loader', 'postcss-loader'],
          fallback: 'style-loader'
        }))
      },
      {
        test: /\.scss|sass$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
          fallback: 'style-loader'
        }))
      },
      {
        test: /\.pug$/,
        use: [
            {loader: 'html-loader'},
            {loader: 'pug-html-loader'}
        ]
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            root: resolve(__dirname, 'src'),
            attrs: ['img:src', 'link:href']
          }
        }]
      },
      {
        test: /\.(png|jpe?g|gif|svg|svgz)(\?.+)?$/,
        exclude: /favicon\.png$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/img/[name].[hash:7].[ext]'
          }
        },
        {
          loader: 'img-loader'
        }]
      },
      // {
      //   test: /\.(jpe?g|png|gif|svg|svgz)$/i,
      //   use: [
      //     'url-loader?limit=10000',
      //     'img-loader'
      //   ]
      // },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'assets/font/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'assets/fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'assets/js/vendors.js',
      chunks: chunks,
      minChunks: chunks.length
    }),
    extractSASS,
    extractCSS,
    new HtmlWebpackPlugin({
      filename: 'main/index.html',
      chunks: 'main/index',
      excludeChunks: ['rent/house', 'rent/flat', 'rent/corp', 'sale/stead'],
      template: './src/pages/main/index/app.pug'
    }),
    new HtmlWebpackPlugin({
      filename: 'rent/house.html',
      chunks: 'rent/house',
      excludeChunks: ['rent/flat', 'main/index', 'rent/corp', 'sale/stead'],

      template: './src/pages/rent/house/app.pug'
    }),
    new HtmlWebpackPlugin({
      filename: 'rent/flat.html',
      chunks: 'rent/flat',
      excludeChunks: ['rent/house', 'main/index', 'rent/corp', 'sale/stead'],
      template: './src/pages/rent/flat/app.pug'
    }),
    new HtmlWebpackPlugin({
      filename: 'rent/corp.html',
      chunks: 'rent/corp',
      excludeChunks: ['rent/house', 'main/index', 'rent/flat', 'sale/stead'],
      template: './src/pages/rent/corp/app.pug'
    }),
    new HtmlWebpackPlugin({
      filename: 'sale/stead.html',
      chunks: 'sale/stead',
      excludeChunks: ['rent/house', 'main/index', 'rent/flat', 'rent/corp'],
      template: './src/pages/sale/stead/app.pug'
    })
  ],
  devServer: {
    host: '127.0.0.1',
    port: 8010,
    historyApiFallback: false,
    noInfo: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    },
    open: true,
    openPage: 'rent/corp.html'
      // contentBase: [ PathToTheFolderWhereYourHTMLsLives ],
      // watchContentBase: true
  },
  devtool: '#eval-source-map'
}

glob.sync('./src/pages/**/*.html').forEach(path => {
  const chunk = path.split('./src/pages/')[1].split('/app.html')[0]
  const filename = chunk + '.html'
  const htmlConf = {
    filename: filename,
    template: path,
    inject: 'body',
    favicon: '',
    hash: process.env.NODE_ENV === 'production',
    chunks: ['vendors', chunk]
  }
  config.plugins.push(new HtmlWebpackPlugin(htmlConf))
})

module.exports = config

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    new OptimizeCSSPlugin()
  ])
}
