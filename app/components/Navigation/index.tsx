import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useGetDepartmentsQuery, useMeQuery } from "../../generated";
import { DepartmentContext, UserContext } from "../../utils/context";
import { LoginScreen } from "../Login";
import { ErrorScreen } from "../Shared/ErrorScreen";
import { LoadingScreen } from "./LoadingScreen";
import { PrivateScreen } from "./PrivateScreen";

const { Navigator, Screen } = createStackNavigator();

export const AppNavigation = () => {
	const { data, error, loading } = useMeQuery();
	const {
		data: deptData,
		error: deptError,
		loading: deptLoading
	} = useGetDepartmentsQuery();

	if (error || deptError) {
		console.log(error);
	}

	return (
		<DepartmentContext.Provider
			value={{ departments: deptData?.getDepartments || [] }}
		>
			<UserContext.Provider
				value={{
					isAuthenticated: !!data?.me,
					user: data?.me,
					isVerified: !!data?.me?.verified
				}}
			>
				<NavigationContainer>
					<Navigator headerMode="none">
						{(loading || deptLoading) && (
							<Screen name="Loading" component={LoadingScreen} />
						)}
						{(error || deptError) && (
							<Screen name="Error" component={ErrorScreen} />
						)}
						{data?.me && deptData?.getDepartments && (
							<Screen name="Private" component={PrivateScreen} />
						)}
						<Screen name="Login" component={LoginScreen} />
					</Navigator>
				</NavigationContainer>
			</UserContext.Provider>
		</DepartmentContext.Provider>
	);
};
