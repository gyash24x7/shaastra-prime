import {
	BottomTabBarProps,
	createBottomTabNavigator
} from "@react-navigation/bottom-tabs";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import {
	BottomNavigation,
	BottomNavigationTab,
	Icon,
	TopNavigation,
	TopNavigationAction
} from "@ui-kitten/components";
import React, { Fragment } from "react";
import globalStyles from "../../utils/globalStyles";
import { SwitchingIcon } from "../Shared/SwitchingIcon";
import { UserDetails } from "./details";
import { UserMedia } from "./media";

const { Navigator, Screen } = createBottomTabNavigator();

export const HomeScreen = () => {
	const { dispatch } = useNavigation();

	return (
		<Fragment>
			<TopNavigation
				style={[globalStyles.darkBg]}
				title="Shaastra Prime"
				alignment="center"
				accessoryLeft={() => (
					<TopNavigationAction
						icon={(props) => <Icon name="menu" {...props} />}
						onPress={() => dispatch(DrawerActions.openDrawer)}
					/>
				)}
			/>
			<Navigator
				initialRouteName="Details"
				tabBar={(props) => <BottomTabBar {...props} />}
			>
				<Screen name="Details" component={UserDetails} />
				<Screen name="Media" component={UserMedia} />
			</Navigator>
		</Fragment>
	);
};

const BottomTabBar = ({ navigation, state }: BottomTabBarProps) => (
	<BottomNavigation
		selectedIndex={state.index}
		onSelect={(index) => navigation.navigate(state.routeNames[index])}
		style={[globalStyles.tabBar, globalStyles.darkBg]}
	>
		<BottomNavigationTab
			title="DETAILS"
			icon={(props) => (
				<SwitchingIcon name="info" {...props} isActive={state.index === 0} />
			)}
		/>
		<BottomNavigationTab
			title="MEDIA"
			icon={(props) => (
				<SwitchingIcon name="file" {...props} isActive={state.index === 1} />
			)}
		/>
	</BottomNavigation>
);
