import { DrawerActions, useNavigation } from "@react-navigation/native";
import {
	Icon,
	Layout,
	Text,
	TopNavigation,
	TopNavigationAction
} from "@ui-kitten/components";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import globalStyles from "../../utils/globalStyles";

export const ChatScreen = () => {
	const { dispatch } = useNavigation();

	return (
		<SafeAreaView>
			<TopNavigation
				title="Shaastra Prime"
				alignment="center"
				accessoryLeft={() => (
					<TopNavigationAction
						icon={(props) => <Icon name="menu" {...props} />}
						onPress={() => dispatch(DrawerActions.openDrawer)}
					/>
				)}
			/>
			<Layout style={globalStyles.wrapper}>
				<Text>Chat Screen</Text>
			</Layout>
		</SafeAreaView>
	);
};
