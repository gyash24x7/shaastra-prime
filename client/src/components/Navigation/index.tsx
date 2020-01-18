import React, { useEffect } from "react";
import {
	LayoutManagerWithViewController,
	NavigationProvider,
	withNavigationViewController
} from "@atlaskit/navigation-next";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { GlobalNav } from "./GlobalNav";
import { ChatNav } from "../Chat/ChatNav";
import { ProfileNav } from "../Profile/ProfileNav";
import { Profile } from "../Profile";
import { Chat } from "../Chat";
import Login from "../Login";
import Signup from "../Signup";

export interface WindowProps {
	navigationViewController: any;
	match: any;
}

const WindowWithViewController = withNavigationViewController(
	({ navigationViewController }: WindowProps) => {
		useEffect(() => {
			navigationViewController.addView(ProfileNav);
			navigationViewController.addView(ChatNav);
		}, [navigationViewController]);

		return (
			<LayoutManagerWithViewController globalNavigation={GlobalNav}>
				<Switch>
					<Route exact path="/" component={Profile} />
					<Route
						exact
						path="/chat"
						render={() => <Redirect to="/chat/channel/1" />}
					/>
					<Route exact path="/chat/channel/:id" component={Chat} />
				</Switch>
			</LayoutManagerWithViewController>
		);
	}
);

export default () => (
	<BrowserRouter>
		<Route exact path="/login" component={Login} />
		<Route exact path="/signup" component={Signup} />
		{false && (
			<NavigationProvider>
				<WindowWithViewController />
			</NavigationProvider>
		)}
	</BrowserRouter>
);
