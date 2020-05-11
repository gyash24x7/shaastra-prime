import { StyleSheet } from "react-native";

export default StyleSheet.create({
	darkBg: {
		backgroundColor: "#141414"
	},

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

	drawerGroup: {
		borderBottomColor: "#1f1f1f",
		borderBottomWidth: 1
	},

	drawerItem: {
		paddingVertical: 15,
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		paddingLeft: 10
	},

	drawerItemActive: {
		backgroundColor: "#0052cc22",
		borderRightWidth: 2,
		borderRightColor: "#0052cc",
		marginRight: -2
	},

	drawerGroupHeading: {
		color: "#6c6c6c",
		fontFamily: "montserrat-regular",
		paddingHorizontal: 15,
		paddingTop: 10,
		paddingBottom: 5
	},

	drawerItemTitle: {
		paddingLeft: 10,
		fontFamily: "montserrat-regular"
	},

	drawerItemIcon: {
		width: 25,
		height: 25,
		marginHorizontal: 5
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
		borderBottomWidth: 2
	},

	heading: {
		fontFamily: "montserrat-bold",
		textTransform: "uppercase",
		fontSize: 12
	}
});
