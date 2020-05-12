import { StyleSheet } from "react-native";

export default StyleSheet.create({
	tabBar: {
		height: 70,
		borderTopColor: "#303030",
		borderTopWidth: 2
	},

	drawer: {
		borderRightWidth: 2,
		borderRightColor: "#303030",
		display: "flex",
		height: "100%"
	},

	drawerLogoContainer: {
		display: "flex",
		justifyContent: "center",
		height: 160,
		alignItems: "center",
		width: "100%",
		borderBottomColor: "#303030",
		borderBottomWidth: 2
	},

	tabIcon: {
		margin: 10
	},

	wrapper: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
		backgroundColor: "#000000",
		padding: 10
	},

	topNavigation: {
		borderBottomColor: "#303030",
		borderBottomWidth: 2,
		height: 70
	},

	heading: {
		fontFamily: "montserrat-bold",
		textTransform: "uppercase",
		fontSize: 12
	},

	text: {
		fontFamily: "montserrat-regular"
	}
});
