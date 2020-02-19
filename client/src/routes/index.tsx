import { ApolloProvider } from "@apollo/client";
import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import { client } from "../apollo";
import { LoginPage } from "../pages/Login";
import { ProfilePage } from "../pages/Profile";
import { SignupPage } from "../pages/Signup";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { VerificationRoute } from "./VerificationRoute";

// import { ChatPage } from "../pages/Chat";
export const AppRoutes = () => (
	<ApolloProvider client={client}>
		<BrowserRouter>
			<Switch>
				<PublicRoute exact path="/login" component={LoginPage} />
				<PublicRoute exact path="/signup" component={SignupPage} />
				<PrivateRoute exact path="/" component={ProfilePage} />
				<VerificationRoute exact path="/verification" />
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
