

const path = require('path');

module.exports = {
	entry: './app/client/app.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, './app/client/dist')
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loaders: ['babel-loader?presets[]=es2015'],
			include: path.join(__dirname, './app/client')
		}]
	},
	node: {
		fs: 'empty'
	}
};

