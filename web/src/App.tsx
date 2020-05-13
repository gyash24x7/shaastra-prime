import { ApolloProvider } from "@apollo/client";
import React from "react";
import { hot } from "react-hot-loader/root";
import { client } from "./graphql";
import { AppRoutes } from "./routes";

export default hot(() => (
	<ApolloProvider client={client}>
		<AppRoutes />
	</ApolloProvider>
));
