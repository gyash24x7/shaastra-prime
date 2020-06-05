const CracoLessPlugin = require("craco-less");

module.exports = {
	webpack: {
		alias: {
			"react-dom":
				process.env.NODE_ENV === "production"
					? "react-dom"
					: "@hot-loader/react-dom"
		}
	},
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: {
							"@primary-color": "#0052cc",
							"@link-color": "#0052cc",
							"@success-color": "#00875A",
							"@warning-color": "#FFAB00",
							"@error-color": "#DE350B"
						},
						javascriptEnabled: true
					}
				}
			}
		}
	]
};
