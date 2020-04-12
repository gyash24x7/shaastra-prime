import React from "react";
import { hot } from "react-hot-loader/root";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { LoginScreen } from "../components/screens/Login";

export const AppRoutes = hot(() => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/login" component={LoginScreen} />
		</Switch>
	</BrowserRouter>
));
