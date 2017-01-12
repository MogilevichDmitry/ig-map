const path = require('path');

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
	context: path.join(__dirname, 'src'),
	entry: {
		lib: './index.ts'
	},
	output: {
		path: './dist',
		filename: '[name].bundle.js'
	},
	devtool: 'source-map',
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
		new CopyWebpackPlugin([{
			from: 'data/**'
		}]),

		new WebpackNotifierPlugin(),
	]
}
