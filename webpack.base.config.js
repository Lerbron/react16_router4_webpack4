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
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
	entry: {
		// vendor: ['react', 'react-dom', 'antd', 'antd/dist/antd.css'],
		index: path.resolve(__dirname, "src/index.js")
	},
	output: {
		path: path.resolve(__dirname, "dist/"),    // 打包好的文件输出的路径
		filename: "js/[name].[hash:6].js",
		publicPath: "/",                  // 指定 HTML 文件中资源文件 (字体、图片、JS文件等) 的文件名的公共 URL 部分的
		chunkFilename: 'js/[name].[hash:6].js'      // 按需加载时打包的chunk
	},

	optimization: {
		splitChunks: {
			chunks: "async",
			minSize: 30000,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '~',
			name: true,
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/](react|react-dom|antd)[\\/]/,
					priority: -10,
					name: 'commons',
					chunks: 'all'
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true
				}
			}
		},

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
	module: {
		rules: [
			{ test: /\.tsx?$/, loader: "awesome-typescript-loader" },
			{
				test: /.(js|jsx)$/,
				loader: 'happypack/loader?id=happybabel',
				exclude: path.resolve(__dirname, "node_modules")  // 排除node_modules下的文件
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: "postcss-loader",
						options: {
							plugins: [
								require("autoprefixer")({
									browsers: [
										"ie >= 11",
										"ff >= 30",
										"chrome >= 34",
										"safari >= 7",
										"opera >= 23",
										"ios >= 7",
										"android >= 4.4",
										"bb >= 10"
									]
								})
							]
						}
					},
				],
				// exclude: /node_modules/
			},
			{
				test: /\.less$/,
				use: [
          MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: "postcss-loader",
						options: {
							plugins: [
								require("autoprefixer")({
									browsers: [
										"ie >= 11",
										"ff >= 30",
										"chrome >= 34",
										"safari >= 7",
										"opera >= 23",
										"ios >= 7",
										"android >= 4.4",
										"bb >= 10"
									]
								})
							]
						}
					},
					'less-loader'
				],
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
        use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: "postcss-loader",
						options: {
							plugins: [
								require("autoprefixer")({
									browsers: [
										"ie >= 11",
										"ff >= 30",
										"chrome >= 34",
										"safari >= 7",
										"opera >= 23",
										"ios >= 7",
										"android >= 4.4",
										"bb >= 10"
									]
								})
							]
						}
					},
					'sass-loader',
				],
				exclude: /node_modules/
			},
			{
				test: /\.(gif|png|jpe?g)$/,
				use: [{
					loader: "file-loader",
					options: {
						name: "static/img/[name].[ext]"
					}
				}]
			},
			{
				test: /\.(ttf|eot|svg|woff)(\?(\w|#)*)?$/,
				use: [{
					loader: "file-loader",
					options: {
						name: "static/font/[name].[ext]"
					}
				}]
			}
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
	plugins: [
		new ProgressBarPlugin({
      format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
    }),
		new MiniCssExtractPlugin({
      filename: 'static/[name].[hash:6].css',
      chunkFilename: 'static/[id].[hash:6].css',
		}),
		new HappyPack({
      id: 'happybabel',
      loaders: [{
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: [
            require.resolve('@babel/preset-env'), 
            require.resolve('@babel/preset-react'),
          ],
          plugins: [
            require.resolve('@babel/plugin-transform-async-to-generator'),
            require.resolve('@babel/plugin-syntax-dynamic-import'),
            require.resolve('@babel/plugin-proposal-class-properties'),
            require.resolve('@babel/plugin-proposal-export-default-from'),
            require.resolve('@babel/plugin-transform-runtime'),
            require.resolve('@babel/plugin-transform-modules-commonjs'),
            require.resolve('babel-plugin-dynamic-import-webpack'),
            [ require.resolve('babel-plugin-import'),
              {
                style: 'css',
                libraryName: 'antd',
                libraryDirectory: 'es'
              }
            ]
          ]
        }
      }],
      threadPool: happyThreadPool,
      // cache: true,
      verbose: true
    }),
		require('autoprefixer'),    // 自动补全css前缀
		new htmlWebpackPlugin({     // 自动创建html
			template: 'index.html',   // 创建html所引用的模板，默认为根目录下的html
			title: "webpack config",  // 传参，模板中可通过<%= htmlWebpackPlugin.options.title%>来获取
			filename: "index.html",   // 创建后的html的文件名
			// inject: true           // 注入打包好的js,默认为true。 可通过  inject: head/body  声明将js注入到模板中的head/body标签中
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
      }
		}),
		
		new CleanWebpackPlugin(),    // 每次打包时，将之前打包生成的文件都删除
		// new webpack.optimize.UglifyJsPlugin({                 // 压缩打包的js文件
		// 	sourceMap: true,                                    // 当你的js编译压缩后，需要继续读取原始脚本信息的行数，位置，警告等有效调试信息时,手动开启UglifyJsPlugin 的配置项：sourceMap: true
		// 	compress: {
		// 		warnings: false
		// 	}
		// }),
		new webpack.ProvidePlugin({ // 配置全局的jquery
			$:"jquery",
			jQuery:"jquery",
			"window.jQuery":"jquery"
		}),
		// new webpack.optimize.ModuleConcatenationPlugin()
	],
};