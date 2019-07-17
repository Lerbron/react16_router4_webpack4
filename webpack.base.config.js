/*
	webpack将所有的文件当作js文件来处理，主要是通过一个入口文件，查找相应的依赖，遇见不是js的文件借助相应的loader来进行处理，打包输出到统一的js文件中。
	webpack基于模块化打包的工具。同时它的核心功能有许多的插件以及loader，来处理我们的文件。
*/

const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require("html-webpack-plugin");
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HappyPack = require('happypack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const chalk = require('chalk')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const os = require('os');
var vendorAssets = require("./dist/vendor-assets.json")
const commonConfig = require('./webpack.common.config');

const webpackMerge = require('webpack-merge')


const baseConfig = {
	entry: {
		index: path.resolve(__dirname, "src/index.js")
	},
	output: {
		path: path.resolve(__dirname, "dist/"),    // 打包好的文件输出的路径
		filename: "js/[name].[hash:6].js",
		publicPath: "/",                  // 指定 HTML 文件中资源文件 (字体、图片、JS文件等) 的文件名的公共 URL 部分的
		chunkFilename: 'js/[name].[hash:6].js'      // 按需加载时打包的chunk
	},
	optimization: {
		minimizer: [
			
			// 压缩css
			new OptimizeCSSAssetsPlugin({
				assetNameRegExp: /\.css$/g,
				cssProcessor: require('cssnano'),
				cssProcessorPluginOptions: {
					preset: ['default', {
						discardComments: {
							removeAll: true,
						},
						normalizeUnicode: false
					}]
				},
				canPrint: true
			})
		]
		
	},
	resolve: {
		modules:[path.resolve(__dirname,'src'),'node_modules'],   // 将src添加到搜索目录，且src目录优先'node_modules'搜索。modules: [],告诉 webpack 解析模块时应该搜索的目录.默认为node——modules
		extensions: [".js", ".jsx", ".css", ".less", '.scss', ".ts", ".tsx"],    // 自动解析确定的扩展名（js/jsx/json),能够使用户在引入模块时不带扩展
		alias: {                                                  // 创建 import 或 require 的别名，来确保模块引入变得更简单
			"components": path.resolve(__dirname, 'src/components/'),
			"containers": path.resolve(__dirname, 'src/containers/'),
			"assets": path.resolve(__dirname, "src/assets/"),
			"actions": path.resolve(__dirname, 'src/actions/'),
			"reducers": path.resolve(__dirname, 'src/reducers/'),
			"utils": path.resolve(__dirname, 'src/utils/'),
			"high-order": path.resolve(__dirname, 'src/high-order/')
		}
	},
	plugins:[
		new webpack.DllReferencePlugin({
			manifest: require(path.join(__dirname, 'dist', 'vendor.manifest.json')),
		}),
		new MiniCssExtractPlugin({
      filename: 'static/[name].[hash:6].css',
      chunkFilename: 'static/[id].[hash:6].css',
		}),

		new htmlWebpackPlugin({     // 自动创建html
			template: 'index.html',   // 创建html所引用的模板，默认为根目录下的html
			title: "webpack config",  // 传参，模板中可通过<%= htmlWebpackPlugin.options.title%>来获取
			filename: "index.html",   // 创建后的html的文件名
			inject: true,           // 注入打包好的js,默认为true。 可通过  inject: head/body  声明将js注入到模板中的head/body标签中
			minify: {
				// 移除注释
				removeComments: true,
				// 不要留下任何空格
				collapseWhitespace: true,
				// 当值匹配默认值时删除属性
				removeRedundantAttributes: true,
				// 使用短的doctype替代doctype
				useShortDoctype: true,
				// 移除空属性
				removeEmptyAttributes: true,
				// 从style和link标签中删除type="text/css"
				removeStyleLinkTypeAttributes: true,
				// 保留单例元素的末尾斜杠。
				keepClosingSlash: true,
				// 在脚本元素和事件属性中缩小JavaScript(使用UglifyJS)
				minifyJS: true,
				// 缩小CSS样式元素和样式属性
				minifyCSS: true,
				// 在各种属性中缩小url
				minifyURLs: true
			},
			vendorJsName: process.env.NODE_ENV == 'development'? `dist/${vendorAssets.vendor.js}` : vendorAssets.vendor.js,// 加载dll文件
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
		}),
		
		new webpack.ProvidePlugin({ // 配置全局的jquery
			$:"jquery",
			jQuery:"jquery",
			"window.jQuery":"jquery"
		}),
	]
}

module.exports = webpackMerge(commonConfig, baseConfig)