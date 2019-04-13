const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// 读取同一目录下的 base config
const config = require('./webpack.base.config');

// 添加 webpack-dev-server 相关的配置项
config.devServer = {
	// contentBase: '/dist/',     // 开启的服务的pathname(设置静态资源的根目录，html-webpack-plugin生成的 html 不是静态资源。当用 html 文件里的地址无法找到静态资源文件时就会去这个目录下去找)
	hot: true,              // 开启模块热替换
	inline: true,           // 开启实时刷新
	publicPath: '/',      // 指定浏览器上访问所有 打包(bundled)文件 (在h5里生成的所有文件) 的根目录，这个根目录是相对服务器地址及端口的，比devServer.contentBase和output.publicPath优先。
	port: 3000,
	host: '0.0.0.0',
	historyApiFallback: true
};
// 有关 Webpack 的 API 本地代理，另请参考 https://webpack.github.io/docs/webpack-dev-server.html#proxy


// 真实场景中，React、jQuery 等优先走全站的 CDN，所以要放在 externals 中
config.externals = {
	// react: 'React',
	// 'react-dom': 'ReactDOM'
};

// 添加 Sourcemap 支持
config.plugins.push(
	new webpack.SourceMapDevToolPlugin({
		filename: '[file].map', // 生成调试的mao文件
		exclude: ['vendor.js'] // vendor 通常不需要 sourcemap
	})
);
config.plugins.push(
	
	// new BundleAnalyzerPlugin(),

	// new webpack.DefinePlugin({
		// 'process.env.NODE_ENV': JSON.stringify('development')
	// }),
)

config.devtool = 'eval-source-map'


config.plugins.push(
	new webpack.HotModuleReplacementPlugin()
);
config.optimization.minimizer.push(
	// we specify a custom UglifyJsPlugin here to get source maps in production
	new UglifyJsPlugin({
		cache: true,
		parallel: true,
		uglifyOptions: {
			compress: {
				ie8: true,
				warnings: true

				// drop_console: true
			},
			output: {
				comments: false,
				beautify: true
			},
			ecma: 5,
			mangle: false,
		},
		sourceMap: true
	}),
)

module.exports = config;