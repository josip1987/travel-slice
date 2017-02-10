module.exports = {
	entry: "./app/assets/scripts/App.js",
	output: {
		path: "./app/temp/scripts",
		filename: "App.js"
	},
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				},
				test: /\.js$/,  //apply babel loader only to JS files
				exclude: /node_modules/
			}
		]
	}
}