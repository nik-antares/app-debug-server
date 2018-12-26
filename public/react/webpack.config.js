const path                 = require ("path");
const webpack              = require ("webpack");
const MiniCssExtractPlugin = require ("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require ('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin    = require ("compression-webpack-plugin");
const CleanWebpackPlugin   = require ('clean-webpack-plugin');


module.exports = (env, arg) => {
	return {
		mode   : (env === 'development') ? 'development' : 'production',
		devtool: (env === 'development') ? 'eval-source-map' : '',
		watch  : (env === 'development') ? true : false,
		entry  : {
			"logapp"     : __dirname + "/apps/logapp/init.jsx",
		},
		output : {
			path    : path.resolve (__dirname, 'dist'),
			filename: '[name]-bundle.js'
		},	
		module : {
			rules: [
				{
					test   : /\.jsx?$/,
					exclude: /node_modules/,
					use    : {
						loader: "babel-loader"
					}
				},
				{
					test: /\.jade$|\.pug$|\.txt$/,
					use : [ 'raw-loader' ]
				},
				{
					test  : /\.css$/,
					loader: 'style-loader!css-loader'
				},
				{	
					test  : /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
					loader  : "file-loader",
					options :{
						name      : '[name].[ext]',
						outputPath: 'assets/',
						useRelativePath: true
					}
				},
				{ 
					test    : /\.(ttf|eot|svg|png|jpg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
					loader  : "file-loader",
					options :{
						name      : '[name].[ext]',
						outputPath: 'assets/',
						useRelativePath: true
					}
				},
				{
					test: /\.less$/,
					use : [
						{
							loader: 'style-loader'
						},
						{
							loader: 'css-loader'
						},
						{
							loader : 'less-loader',
							options: {
								paths: [
									path.join (__dirname, 'app/less')
								]
							}
						}
					],
				},
				{
					test: /\.js$/,
					exclude: /node_modules(?!\/quill-image-drop-module|quill-image-resize-module)/,
					loader: 'babel-loader',
				},
				{
					test: /\.scss$/,
					use : [
						{
							loader: 'style-loader'
						},
						{
							loader: 'css-loader'
						},
						{
							loader : 'sass-loader',
							options: {
								paths: [
									path.join (__dirname, 'app/less')
								]
							}
						}
					],
				},
			],
		},
		plugins: [
			new webpack.ProvidePlugin ({
				'$'            : 'jquery',
				jquery         : "jquery",
				'window.$'     : 'jquery',
				"window.jQuery": "jquery",
				jQuery         : "jquery",
				"window.Quill" : "quill"
			}),

			new BundleAnalyzerPlugin ({
				analyzerHost : '0.0.0.0'
			}),

			new MiniCssExtractPlugin({
				filename : "[name].css", 
				chunkFilename: "[id].css"
			}),

			//new webpack.IgnorePlugin (/^\.\/locale$/, [/moment$/]),
			new CompressionPlugin ({
				asset    : "[path].gz[query]",
				algorithm: "gzip",
				test     : /\.js$|\.css$|\.html$/,
				threshold: 10240,
				minRatio : 0
			}),
			new CleanWebpackPlugin (['dist']),
		],
		optimization: {
			splitChunks: {
				cacheGroups: {
					commons: {
						name     : "commons",
						chunks   : "initial",
						minChunks: 2,
					}
				}
			}
		},
		resolve: {
			alias: {
				'common'    : path.join (__dirname, '/apps/common/'),
				'api'       : path.join (__dirname, '/apps/api/'),
				'm_install' : path.join (__dirname, '/../../../../../m_install/')
			}
		}
	}
};
