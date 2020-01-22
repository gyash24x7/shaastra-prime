import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { ProfilePage } from "../pages/Profile";
import { SignupPage } from "../pages/Signup";
import { ChatPage } from "../pages/Chat";
import { LoginPage } from "../pages/Login";
import { Provider } from "react-redux";
import { store } from "../store";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRoutes = () => (
	<Provider store={ store }>
		<BrowserRouter>
			<Switch>
				<PublicRoute exact path="/login" component={ LoginPage }/>
				<PublicRoute exact path="/signup" component={ SignupPage }/>
				<PrivateRoute exact path="/" component={ ProfilePage }/>
				<PrivateRoute exact path="/chat/channel/:id" component={ ChatPage }/>
			</Switch>
		</BrowserRouter>
	</Provider>
);
