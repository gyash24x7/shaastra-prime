import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useMemo, useState } from "react";
import { AsyncStorage } from "react-native";
import { useGetDepartmentsQuery } from "../../generated";
import { AuthContext, DepartmentContext } from "../../utils/context";
import { ShowError } from "../Shared/ShowError";
import { LoadingScreen } from "./LoadingScreen";
import { PrivateScreen } from "./PrivateScreen";
import { PublicScreen } from "./PublicScreen";

const { Navigator, Screen } = createStackNavigator();

export const AppNavigation = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const { data, error } = useGetDepartmentsQuery();

	useEffect(() => {
		const getTokenAsync = async () => {
			let authToken = await AsyncStorage.getItem("authToken");
			if (!!authToken) setIsLoggedIn(true);
		};

		getTokenAsync();
	}, []);

	const authContext = useMemo(() => ({ setIsLoggedIn }), []);

	if (error) {
		console.log(error);
		return <ShowError />;
	}

	if (data?.getDepartments) {
		return (
			<NavigationContainer>
				<DepartmentContext.Provider
					value={{ departments: data.getDepartments }}
				>
					<AuthContext.Provider value={authContext}>
						<Navigator headerMode="none">
							{isLoggedIn ? (
								<Screen name="Private" component={PrivateScreen} />
							) : (
								<Screen name="Public" component={PublicScreen} />
							)}
						</Navigator>
					</AuthContext.Provider>
				</DepartmentContext.Provider>
			</NavigationContainer>
		);
	}

	return <LoadingScreen />;
};
