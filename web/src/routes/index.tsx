import React, { useMemo, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ChatScreen } from "../components/Chat";
import { NoChannelScreen } from "../components/Chat/NoChannel";
import { EquipScreen } from "../components/Equip";
import { HomeScreen } from "../components/Home";
import { LoginScreen } from "../components/Login";
import { ForgotPasswordScreen } from "../components/Login/ForgotPassword";
import { OTPScreen } from "../components/Login/OTPScreen";
import { SignupScreen } from "../components/Login/Signup";
import { PrivateLayout } from "../components/shared/PrivateLayout";
import { PublicLayout } from "../components/shared/PublicLayout";
import { TeamScreen } from "../components/Team";
import { UpdateScreen } from "../components/Updates";
import { AuthContext } from "../utils/context";

export const AppRoutes = () => {
	const [authStatus, setAuthStatus] = useState([
		!!localStorage.getItem("authToken"),
		!!localStorage.getItem("verificationToken")
	]);
	const authContext = useMemo(() => ({ setAuthStatus }), []);

	return (
		<AuthContext.Provider value={authContext}>
			<BrowserRouter>
				{authStatus[1] ? (
					<PrivateLayout>
						<Switch>
							<Route exact path="/chat" component={NoChannelScreen} />
							<Route exact path="/chat/:channelId" component={ChatScreen} />
							<Route exact path="/equip" component={EquipScreen} />
							<Route exact path="/finbooks" component={HomeScreen} />
							<Route exact path="/updates" component={UpdateScreen} />
							<Route exact path="/team" component={TeamScreen} />
							<Redirect from="/profile" to="/" />
							<Redirect from="/verification" to="/" />
							<Redirect from="/login" to="/" />
							<Redirect from="/signup" to="/" />
							<Redirect from="/enterotp" to="/" />
							<Redirect from="/forgotpassword" to="/" />
							<Route exact path="/" component={HomeScreen} />
						</Switch>
					</PrivateLayout>
				) : authStatus[0] ? (
					<PublicLayout>
						<Switch>
							<Route exact path="/verification" component={OTPScreen} />
							<Redirect from="/" to="/verification" />
						</Switch>
					</PublicLayout>
				) : (
					<PublicLayout>
						<Switch>
							<Route exact path="/login" component={LoginScreen} />
							<Route exact path="/signup" component={SignupScreen} />
							<Route
								exact
								path="/forgotpassword"
								component={ForgotPasswordScreen}
							/>
							<Route exact path="/enterotp" component={OTPScreen} />
							<Redirect from="/" to="/login" />
						</Switch>
					</PublicLayout>
				)}
			</BrowserRouter>
		</AuthContext.Provider>
	);
};
