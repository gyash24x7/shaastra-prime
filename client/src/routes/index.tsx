import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ProfilePage } from "../pages/Profile";
import { SignupPage } from "../pages/Signup";
import { ChatPage } from "../pages/Chat";
import { LoginPage } from "../pages/Login";
import { Provider } from "react-redux";
import { store } from "../store";

export const AppRoutes = () => (
	<Provider store={ store }>
		<BrowserRouter>
			<Switch>
				<Route exact path="/login" component={ LoginPage }/>
				<Route exact path="/signup" component={ SignupPage }/>
				<Route exact path="/" component={ ProfilePage }/>
				<Route
					exact
					path="/chat"
					render={ () => <Redirect to="/chat/channel/1"/> }
				/>
				<Route exact path="/chat/channel/:id" component={ ChatPage }/>
			</Switch>
		</BrowserRouter>
	</Provider>
);
