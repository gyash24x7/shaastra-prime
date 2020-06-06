import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { ForgotPassword } from "../Auth/ForgotPassword";
import { LoginScreen } from "../Auth/Login";
import { SignupScreen } from "../Auth/Signup";

const { Navigator, Screen } = createStackNavigator();

export const PublicScreen = () => (
	<Navigator initialRouteName="Login" headerMode="none">
		<Screen name="Login" component={LoginScreen} />
		<Screen name="Signup" component={SignupScreen} />
		<Screen name="ForgotPassword" component={ForgotPassword} />
	</Navigator>
);
