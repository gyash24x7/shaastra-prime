import React from "react";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";
import { ProfilePage } from "../pages/Profile";
import { SignupPage } from "../pages/Signup";
import { ChatPage } from "../pages/Chat";
import { LoginPage } from "../pages/Login";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { hot } from "react-hot-loader/root";
import { StoreProvider, initialStore } from "../store";

export const AppRoutes = hot(() => (
	<StoreProvider value={initialStore}>
		<BrowserRouter>
			<Switch>
				<PublicRoute exact path="/login" component={LoginPage} />
				<PublicRoute exact path="/signup" component={SignupPage} />
				<PrivateRoute exact path="/" component={ProfilePage} />
				{/* <PrivateRoute
					exact
					path="/chat"
					render={() => <Redirect to="/chat/channel/1" />}
				/>
				<PrivateRoute exact path="/chat/channel/:id" component={ChatPage} /> */}
			</Switch>
		</BrowserRouter>
	</StoreProvider>
));
