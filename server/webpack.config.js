const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
	entry: "./src/index.ts",
	target: "node",
	externals: [nodeExternals()],
	mode: "production",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/
			},
			{
				test: /\.mjs$/,
				include: /node_modules/,
				type: "javascript/auto"
			}
		]
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js", ".mjs", ".json"]
	},
	output: {
		filename: "index.js",
		path: path.resolve(__dirname, "dist")
	}
};