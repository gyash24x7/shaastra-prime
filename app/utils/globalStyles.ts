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

	tabIcon: {
		margin: 5
	},

	wrapper: {
		display: "flex",
		alignItems: "center",
		backgroundColor: "#000000",
		padding: 10,
		flex: 1
	},

	topNavigation: {
		borderBottomColor: "#303030",
		borderBottomWidth: 2,
		height: 70
	},

	drawerNavigation: {
		backgroundColor: "#141414",
		borderRightColor: "#303030",
		borderRightWidth: 2
	},

	heading: {
		fontFamily: "montserrat-bold",
		textTransform: "uppercase"
	},

	text: {
		fontFamily: "montserrat-regular",
		textTransform: "capitalize"
	},

	title: {
		fontFamily: "montserrat-bold",
		textTransform: "uppercase",
		fontSize: 20
	}
});
