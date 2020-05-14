import { DrawerActions, useNavigation } from "@react-navigation/native";
import {
	Icon,
	TopNavigation,
	TopNavigationAction
} from "@ui-kitten/components";
import React from "react";
import { Image } from "react-native";
import globalStyles from "../../utils/globalStyles";

export const TopNav = () => {
	const { dispatch } = useNavigation();

	return (
		<TopNavigation
			style={[globalStyles.topNavigation]}
			title={() => (
				<Image
					source={require("../../assets/images/LightLogo.png")}
					style={{ width: 100, resizeMode: "contain" }}
				/>
			)}
			alignment="center"
			accessoryLeft={() => (
				<TopNavigationAction
					icon={(props) => <Icon name="menu" {...props} />}
					onPress={() => dispatch(DrawerActions.openDrawer)}
				/>
			)}
			accessoryRight={() => (
				<TopNavigationAction
					icon={(props) => <Icon name="menu" {...props} />}
					onPress={() => dispatch(DrawerActions.openDrawer)}
				/>
			)}
		/>
	);
};
