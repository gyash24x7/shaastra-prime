import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { LoginScreen } from "../components/Login";
import { LoadingScreen } from "./LoadingScreen";
import { PublicScreen } from "./PublicScreen";

const { Navigator, Screen } = createStackNavigator();

export const AppNavigation = () => {
	return (
		<NavigationContainer>
			<Navigator initialRouteName="Loading" headerMode="none">
				<Screen name="Loading" component={LoadingScreen} />
				<Screen name="Public" component={PublicScreen} />
				<Screen name="Login" component={LoginScreen} />
			</Navigator>
		</NavigationContainer>
	);
};
