import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { Fragment } from "react";
import { BottomNav } from "../Navigation/BottomNav";
import { TopNav } from "../Navigation/TopNav";
import { UserDetails } from "./details";

const { Navigator, Screen } = createBottomTabNavigator();

export const HomeScreen = () => (
	<Fragment>
		<TopNav title="Profile" />
		<Navigator
			initialRouteName="Details"
			tabBar={(props) => <BottomNav {...props} />}
		>
			<Screen name="Details" component={UserDetails} />
			{/* <Screen name="Media" component={UserMedia} /> */}
		</Navigator>
	</Fragment>
);
