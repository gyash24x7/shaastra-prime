import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "@ui-kitten/components";
import React from "react";
import { useMeQuery } from "../../generated";
import { LoginScreen } from "../Login";
import { LoadingScreen } from "./LoadingScreen";
import { PrivateScreen } from "./PrivateScreen";

const { Navigator, Screen } = createStackNavigator();

export const AppNavigation = () => {
	const { data, error } = useMeQuery();

	if (error) {
		console.log(error);
		return <Text>Some Server Error!</Text>;
	}

	return (
		<NavigationContainer>
			<Navigator initialRouteName="Private" headerMode="none">
				<Screen name="Loading" component={LoadingScreen} />
				{data?.me && <Screen name="Private" component={PrivateScreen} />}
				<Screen name="Login" component={LoginScreen} />
			</Navigator>
		</NavigationContainer>
	);
};
