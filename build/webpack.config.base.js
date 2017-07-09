let webpack = require('webpack');
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    'js/lib': [ 'vue' ],
    'app': path.resolve(__dirname, '../src/index')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    libraryTarget: 'umd',
    filename: 'js/[name]-[chunkhash:6].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.less'],
    alias: {
      vue: 'vue/dist/vue.common.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
        exclude: /node_modules/
      },
      // {
      //   test: /\.json$/,
      //   use: 'json-loader',
      //   exclude: /node_modules/
      // },
			{
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ],
        // exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [ 'style-loader', 'css-loader', 'less-loader' ],
        exclude: /node_modules/
      },
      {
        test: /\.(gif|jpg|png|eot|ttf|woff|woff2|svg)$/,
        use: 'url-loader?limit=1000&name=assets/[hash].[ext]',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
    	name: 'js/lib',
    	filename: 'js/lib-[hash].min.js'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['js/lib', 'app'],
      filename: path.resolve(__dirname, '../dist/index.html'),
      template: path.resolve(__dirname, '../src/index.html')
    })
  ]
};
