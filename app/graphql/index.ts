import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/link-context";
import { WebSocketLink } from "@apollo/link-ws";
import { AsyncStorage } from "react-native";

const [WS_URL, HTTP_URL] =
	process.env.NODE_ENV === "production"
		? ["ws://192.168.43.59:8000", "http://192.168.43.59:8000"]
		: ["wss://api.shaastra.org", "https://api.shaastra.org"];

const wsLink = new WebSocketLink({
	uri: WS_URL,
	options: {
		reconnect: true,
		connectionParams: async () => {
			const token = await AsyncStorage.getItem("authToken");
			return { Authorization: token ? `Bearer ${token}` : undefined };
		}
	}
});

const httpLink = new HttpLink({ uri: HTTP_URL });

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
	wsLink as any,
	httpLink
);

export const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: authLink.concat(splitLink as any) as any
});
