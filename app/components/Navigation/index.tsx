import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LoginScreen } from "../Login";
import { LoadingScreen } from "./LoadingScreen";
import { PrivateScreen } from "./PrivateScreen";

const { Navigator, Screen } = createStackNavigator();

export const AppNavigation = () => {
	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<Navigator initialRouteName="Loading" headerMode="none">
					<Screen name="Loading" component={LoadingScreen} />
					<Screen name="Private" component={PrivateScreen} />
					<Screen name="Login" component={LoginScreen} />
				</Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
};
