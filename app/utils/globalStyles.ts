import { StyleSheet } from "react-native";

export default StyleSheet.create({
	tabBar: { height: 70, borderTopColor: "#303030", borderTopWidth: 1 },

	drawer: {
		borderRightWidth: 1,
		borderRightColor: "#303030",
		display: "flex",
		height: "100%"
	},

	tabIcon: { margin: 5 },

	wrapper: {
		display: "flex",
		alignItems: "center",
		backgroundColor: "#000000",
		padding: 10,
		flex: 1
	},

	topNavigation: {
		borderBottomColor: "#303030",
		borderBottomWidth: 1,
		height: 70
	},

	list: { width: "100%", flex: 1, borderWidth: 1, borderColor: "#303030" },

	drawerNavigation: {
		backgroundColor: "#141414",
		borderRightColor: "#303030",
		borderRightWidth: 1
	},

	heading: {
		fontFamily: "montserrat-bold",
		textTransform: "uppercase",
		color: "#B3B3B3"
	},

	text: { fontFamily: "montserrat-regular", textTransform: "capitalize" },

	title: {
		fontFamily: "montserrat-bold",
		textTransform: "uppercase",
		fontSize: 20
	},

	errorMsg: {
		color: "#de350b",
		textTransform: "uppercase",
		fontFamily: "montserrat-bold",
		fontSize: 11,
		textAlign: "center",
		marginTop: 10
	}
});
