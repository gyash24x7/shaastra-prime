import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/link-context";
import { WebSocketLink } from "@apollo/link-ws";
import { AsyncStorage } from "react-native";

const wsLink = new WebSocketLink({
	uri: "ws://localhost:8000",
	options: {
		reconnect: true,
		connectionParams: async () => {
			const token = await AsyncStorage.getItem("authToken");
			return {
				Authorization: token ? `Bearer ${token}` : undefined
			};
		}
	}
});

const httpLink = new HttpLink({ uri: "http://localhost:8000" });

const authLink = setContext(async (_, { headers }) => {
	const token = await AsyncStorage.getItem("authToken");
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : undefined
		}
	};
});

const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === "OperationDefinition" &&
			definition.operation === "subscription"
		);
	},
	wsLink,
	httpLink
);

export const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: authLink.concat(splitLink)
});
