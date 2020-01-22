const path = require( "path" );
const MiniCssExtractPlugin = require( "mini-css-extract-plugin" );
const webpack = require( "webpack" );
const HtmlWebpackPlugin = require( "html-webpack-plugin" );
const OptimizeCSSAssetsPlugin = require( "optimize-css-assets-webpack-plugin" );
const CompressionPlugin = require( "compression-webpack-plugin" );
const TerserPlugin = require( "terser-webpack-plugin" );
const PWAManifestPlugin = require( "webpack-pwa-manifest" );
const WorkboxWebpackPlugin = require( "workbox-webpack-plugin" );

module.exports = {
	entry : "./client/src/index.tsx",
	mode : "production",
	resolve : {
		extensions : [ ".js", ".jsx", ".ts", ".tsx" ]
	},
	optimization : {
		minimizer : [
			new OptimizeCSSAssetsPlugin( {} ),
			new TerserPlugin( {
				cache : true,
				parallel : true,
				terserOptions : {
					parse : {
						ecma : 8
					},
					compress : {
						ecma : 5,
						warnings : false,
						comparisons : false,
						inline : 2
					},
					mangle : {
						safari10 : true
					},
					output : {
						comments : false,
						ecma : 5,
						ascii_only : true
					}
				}
			} )
		],
		nodeEnv : "production",
		splitChunks : {
			chunks : "all",
			cacheGroups : {
				commons : {
					test : /[\\/]node_modules[\\/]/,
					name : "vendors",
					chunks : "all"
				}
			}
		},
		mangleWasmImports : true
	},
	output : {
		path : path.join( __dirname, "client", "build" ),
		filename : "[name].js",
		publicPath : "/"
	},
	module : {
		rules : [
			{
				loader : "babel-loader",
				test : /\.(js|jsx|tsx|ts)$/,
				exclude : /node_modules/
			},
			{
				test : /\.(sc|sa|c)ss$/,
				use : [
					MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader : "sass-loader",
						options : {
							implementation : require( "sass" )
						}
					}
				]
			},
			{
				test : /\.(png|jpe?g|gif|svg)$/,
				use : [ "url-loader", "file-loader" ]
			}
		]
	},
	target : "web",
	plugins : [
		new HtmlWebpackPlugin( {
			template : "./client/public/index.html",
			filename : "index.html",
			excludeChunks : [ "server" ],
			minify : {
				removeComments : true,
				collapseWhitespace : true,
				removeRedundantAttributes : true,
				useShortDoctype : true,
				removeEmptyAttributes : true,
				removeStyleLinkTypeAttributes : true,
				keepClosingSlash : true,
				minifyJS : true,
				minifyCSS : true,
				minifyURLs : true
			}
		} ),
		new MiniCssExtractPlugin( {
			filename : "styles.min.css",
			chunkFilename : "[id].css"
		} ),
		new webpack.IgnorePlugin( /^\.\/locale$/, /moment$/ ),
		new PWAManifestPlugin( {
			name : "Shaastra Prime 2.0",
			short_name : "Prime",
			publicPath : "/",
			description : "One stop solution for Shaastra",
			display : "standalone",
			start_url : ".",
			background_color : "#ffffff",
			theme_color : "#172b4d",
			fingerprints : false
		} ),
		new WorkboxWebpackPlugin.GenerateSW( {
			clientsClaim : true,
			skipWaiting : true
		} ),
		new CompressionPlugin()
	]
};
