import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { LoginScreen } from "../Login";
import { LoadingScreen } from "./LoadingScreen";
import { PrivateScreen } from "./PrivateScreen";

const { Navigator, Screen } = createStackNavigator();

export const AppNavigation = () => {
	return (
		<NavigationContainer>
			<Navigator initialRouteName="Private" headerMode="none">
				<Screen name="Loading" component={LoadingScreen} />
				<Screen name="Private" component={PrivateScreen} />
				<Screen name="Login" component={LoginScreen} />
			</Navigator>
		</NavigationContainer>
	);
};
