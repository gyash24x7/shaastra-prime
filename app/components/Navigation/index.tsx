import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useMemo, useState } from "react";
import { AsyncStorage } from "react-native";
import { AuthContext } from "../../utils/context";
import { VerificationScreen } from "../Auth/VerificationScreen";
import { PrivateScreen } from "./PrivateScreen";
import { PublicScreen } from "./PublicScreen";

const { Navigator, Screen } = createStackNavigator();

export const AppNavigation = () => {
	const [authStatus, setAuthStatus] = useState([false, false]);

	useEffect(() => {
		const getTokensAsync = async () => {
			let authToken = await AsyncStorage.getItem("authToken");
			let verificationToken = await AsyncStorage.getItem("verificationToken");
			setAuthStatus([!!authToken, !!verificationToken]);
		};

		getTokensAsync();
	}, []);

	const authContext = useMemo(() => ({ setAuthStatus }), []);

	return (
		<NavigationContainer>
			<AuthContext.Provider value={authContext}>
				<Navigator headerMode="none">
					{authStatus[1] ? (
						<Screen name="Private" component={PrivateScreen} />
					) : authStatus[0] ? (
						<Screen name="Verification" component={VerificationScreen} />
					) : (
						<Screen name="Public" component={PublicScreen} />
					)}
				</Navigator>
			</AuthContext.Provider>
		</NavigationContainer>
	);
};
