import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { ProfilePage } from "../pages/Profile";
import { SignupPage } from "../pages/Signup";
// import { ChatPage } from "../pages/Chat";
import { LoginPage } from "../pages/Login";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "../apollo";

export const AppRoutes = () => (
	<ApolloProvider client={client}>
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
	</ApolloProvider>
);
