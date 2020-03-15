import { ApolloProvider } from "@apollo/client";
import { light, mapping } from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import React from "react";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";

import { client } from "../apollo";
import { ChatScreen } from "../components/screens/Chat";
import { LoginScreen } from "../components/screens/Login";
import { ProfileScreen } from "../components/screens/Profile";
import { SignupScreen } from "../components/screens/Signup";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { VerificationRoute } from "./VerificationRoute";

const AppRoutes = () => (
	<ApplicationProvider mapping={mapping} theme={light}>
		<ApolloProvider client={client}>
			<BrowserRouter>
				<Switch>
					<PublicRoute exact path="/login" component={LoginScreen} />
					<PublicRoute exact path="/signup" component={SignupScreen} />
					<PrivateRoute exact path="/" component={ProfileScreen} />
					<VerificationRoute exact path="/verification" />
					<PrivateRoute
						exact
						path="/chat"
						render={() => <Redirect to="/chat/channel/1" />}
					/>
					<PrivateRoute exact path="/chat/channel/:id" component={ChatScreen} />
				</Switch>
			</BrowserRouter>
		</ApolloProvider>
	</ApplicationProvider>
);

export default AppRoutes;
