import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { LoginScreen } from "../components/screens/Login";

export const AppRoutes = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/login" component={LoginScreen} />
		</Switch>
	</BrowserRouter>
);
