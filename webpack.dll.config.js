const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin')
const webpackMerge = require('webpack-merge')
const commonConfig = require('./webpack.common.config');

const baseConfig = {
	mode: 'production',
	entry: {
		vendor: ['react', 'react-dom', 'antd', 'jquery', 'redux', 'react-router-dom', 'react-redux', 'react-router-redux', 'redux-thunk', 'react-loadable']
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].dll.[hash:6].js',
		// libraryTarget: 'var',
		library: '[name]_dll_', // 全局变量名，其他模块会从此变量上获取里面模块
	},
	// manifest是描述文件
	plugins: [
		new webpack.DllPlugin({
			name: '[name]_dll_',
			path: path.join(__dirname, 'dist', '[name].manifest.json')
		}),
		new CleanWebpackPlugin(),
		new AssetsPlugin({
			filename: 'vendor-assets.json',
			path: path.join(__dirname, 'dist')
		})
	]
}

module.exports = webpackMerge(commonConfig, baseConfig)
