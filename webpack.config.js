require('dotenv').config()

const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'

module.exports = {
  mode,
  devServer: {
    contentBase: '.'
  },
  entry: './search/index.js',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
    ]
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'search/components'),
      plugins: path.resolve(__dirname, 'search/plugins'),
      'vue$': 'vue/dist/vue.esm.js'
    },
  },
  plugins: [new VueLoaderPlugin(), new webpack.EnvironmentPlugin(['NODE_ENV', 'INDEX_NAME', 'ALGOLIA_APP_ID', 'ALGOLIA_API_KEY'])],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'application.js'
  }
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}

