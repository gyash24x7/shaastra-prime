import React from "react";
import { hot } from "react-hot-loader/root";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import { ChatScreen } from "../components/chat";
import { HomeScreen } from "../components/Home";
import { LoginScreen } from "../components/Login";
import { TeamScreen } from "../components/Team";
import { UpdateScreen } from "../components/Updates";

export const AppRoutes = hot(() => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/login" component={LoginScreen} />
			<Route exact path="/chat/:channel" component={ChatScreen} />
			<Route exact path="/equip" component={HomeScreen} />
			<Route exact path="/finbooks" component={HomeScreen} />
			<Route exact path="/updates" component={UpdateScreen} />
			<Route exact path="/team/:department" component={TeamScreen} />
			<Redirect from="/profile" to="/" />
			<Redirect from="/chat" to="/chat/CoreGroup" />
			<Route exact path="/" component={HomeScreen} />
		</Switch>
	</BrowserRouter>
));
