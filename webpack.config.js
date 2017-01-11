const path = require('path');
const webpack = require('webpack');

module.exports = {
	context: path.join(__dirname, 'src'),
	entry: {
		map: './index.js'
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
		}]
	}
}
