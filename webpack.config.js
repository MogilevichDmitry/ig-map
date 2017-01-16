const path = require('path');

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

const config = {
	context: path.join(__dirname, 'src'),
	entry: {
		sample: './index.ts',
		map: './map.ts'
	},
	output: {
		path: './dist',
		filename: '[name].js',
		library: true,
		libraryTarget: 'commonjs2'
	},
	// devtool: 'source-map',
	module: {
		loaders: [{
			test: /\.css$/,
			loader: 'style!css'
		}, {
			test: /\.(woff|woff2|ttf|svg|eot|png)$/,
			loader: 'file'
		}, {
			test: /\.(json|geojson)$/,
			loader: 'json'
		}, {
			test: /\.ts(x?)$/,
			loader: 'babel-loader?presets[]=es2015!ts-loader'
		}]
	},
	devServer: {
		contentBase: __dirname
	},
	resolve: {
		extensions: ['', '.js', '.ts'],
	},
	plugins: [
		new WebpackNotifierPlugin(),
	]
}

if (process.env.NODE_ENV === 'production') {
	delete config.entry.sample;
	config.plugins.push(new webpack.optimize.UglifyJsPlugin())
}

module.exports = config;
