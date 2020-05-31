import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { LoginScreen } from "../Login";

const { Navigator, Screen } = createStackNavigator();

export const PublicScreen = () => (
	<Navigator initialRouteName="Login" headerMode="none">
		<Screen name="Login" component={LoginScreen} />
	</Navigator>
);
