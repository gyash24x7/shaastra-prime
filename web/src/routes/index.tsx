import React from "react";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";

import { ChatScreen } from "../components/Chat";
import { EquipScreen } from "../components/Equip";
import { HomeScreen } from "../components/Home";
import { LoginScreen } from "../components/Login";
import { ForgotPasswordScreen } from "../components/Login/ForgotPassword";
import { OTPScreen } from "../components/Login/OTPScreen";
import { SignupScreen } from "../components/Login/Signup";
import { Loader } from "../components/shared/Loader";
import { ShowError } from "../components/shared/ShowError";
import { TeamScreen } from "../components/Team";
import { UpdateScreen } from "../components/Updates";
import { useGetDepartmentsQuery, useMeQuery } from "../generated";
import { DepartmentContext, UserContext } from "../utils/context";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { VerificationRoute } from "./VerificationRoute";

export const AppRoutes = () => {
	const { data, error } = useMeQuery();
	const { data: deptData, error: deptError } = useGetDepartmentsQuery();

	if (error || deptError) return <ShowError />;

	if (data && deptData)
		return (
			<DepartmentContext.Provider
				value={{ departments: deptData.getDepartments }}
			>
				<UserContext.Provider
					value={{
						isAuthenticated: !!data.me,
						user: data.me,
						isVerified: !!data.me?.verified
					}}
				>
					<BrowserRouter>
						<Switch>
							<PublicRoute exact path="/login" component={LoginScreen} />
							<PublicRoute exact path="/signup" component={SignupScreen} />
							<PublicRoute
								exact
								path="/forgotpassword"
								component={ForgotPasswordScreen}
							/>
							<PublicRoute exact path="/enterotp" component={OTPScreen} />
							<PrivateRoute
								exact
								path="/chat/:channel"
								component={ChatScreen}
							/>
							<PrivateRoute exact path="/equip" component={EquipScreen} />
							<PrivateRoute exact path="/finbooks" component={HomeScreen} />
							<PrivateRoute exact path="/updates" component={UpdateScreen} />
							<PrivateRoute
								exact
								path="/team/:department"
								component={TeamScreen}
							/>
							<VerificationRoute
								exact
								path="/verification"
								component={OTPScreen}
							/>
							<Redirect from="/profile" to="/" />
							<Redirect from="/chat" to="/chat/CoreGroup" />
							<PrivateRoute exact path="/" component={HomeScreen} />
						</Switch>
					</BrowserRouter>
				</UserContext.Provider>
			</DepartmentContext.Provider>
		);

	return <Loader />;
};
