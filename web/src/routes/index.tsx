import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ChatScreen } from "../components/Chat";
import { EquipScreen } from "../components/Equip";
import { HomeScreen } from "../components/Home";
import { LoginScreen } from "../components/Login";
import { ForgotPasswordScreen } from "../components/Login/ForgotPassword";
import { OTPScreen } from "../components/Login/OTPScreen";
import { SignupScreen } from "../components/Login/Signup";
import { TeamScreen } from "../components/Team";
import { UpdateScreen } from "../components/Updates";

export const AppRoutes = () => {
	// const { data, error } = useMeQuery();
	// const { data: deptData, error: deptError } = useGetDepartmentsQuery();

	// if (error || deptError) {
	// 	console.log(error, deptError);
	// 	return <ShowError />;
	// }

	// if (data && deptData)
	return (
		// <DepartmentContext.Provider
		// 	value={{ departments: deptData.getDepartments }}
		// >
		// 	<UserContext.Provider
		// 		value={{
		// 			isAuthenticated: !!data.me,
		// 			user: data.me,
		// 			isVerified: !!data.me?.verified
		// 		}}
		// 	>
		<BrowserRouter>
			<Switch>
				<Route exact path="/login" component={LoginScreen} />
				<Route exact path="/signup" component={SignupScreen} />
				<Route exact path="/forgotpassword" component={ForgotPasswordScreen} />
				<Route exact path="/enterotp" component={OTPScreen} />
				<Route exact path="/chat/:channelId" component={ChatScreen} />
				<Route exact path="/equip" component={EquipScreen} />
				<Route exact path="/finbooks" component={HomeScreen} />
				<Route exact path="/updates" component={UpdateScreen} />
				<Route exact path="/team" component={TeamScreen} />
				<Route exact path="/verification" component={OTPScreen} />
				<Redirect from="/profile" to="/" />
				<Redirect from="/chat" to="/chat/lnvkjfsnv" />
				<Route exact path="/" component={HomeScreen} />
			</Switch>
		</BrowserRouter>
		// 	</UserContext.Provider>
		// </DepartmentContext.Provider>
	);

	// return <Loader />;
};
