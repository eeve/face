const webpack = require('webpack')
const merge = require('webpack-merge')

const base = require('./webpack.config.base')

module.exports = merge(base, {
  devtool: '#source-map',
  output: {
    publicPath: '/',
  },
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
	],
  devServer: {
    hot: true,
    quiet: false,
    inline: true,
    compress: true,
    contentBase: '../dist',
    disableHostCheck: true,
    host: '0.0.0.0',
		port: 4000
  }
});
