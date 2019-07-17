/*
	webpack将所有的文件当作js文件来处理，主要是通过一个入口文件，查找相应的依赖，遇见不是js的文件借助相应的loader来进行处理，打包输出到统一的js文件中。
	webpack基于模块化打包的工具。同时它的核心功能有许多的插件以及loader，来处理我们的文件。
*/

const path = require('path');
const HappyPack = require('happypack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const chalk = require('chalk')
const os = require('os');
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
	

	optimization: {
		
	},  
	module: {
		rules: [
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
		
	},
	plugins: [
		
		new ProgressBarPlugin({
      format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
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
		
	],
};