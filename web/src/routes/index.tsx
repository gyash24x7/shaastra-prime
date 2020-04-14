import React from "react";
import { hot } from "react-hot-loader/root";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import { HomeScreen } from "../components/Home";
import { LoginScreen } from "../components/Login";
import { UpdateScreen } from "../components/Updates";

export const AppRoutes = hot(() => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/login" component={LoginScreen} />
			<Route exact path="/chat" component={HomeScreen} />
			<Route exact path="/equip" component={HomeScreen} />
			<Route exact path="/finbooks" component={HomeScreen} />
			<Route exact path="/updates" component={UpdateScreen} />
			<Redirect from="/profile" to="/" />
			<Route exact path="/" component={HomeScreen} />
		</Switch>
	</BrowserRouter>
));
