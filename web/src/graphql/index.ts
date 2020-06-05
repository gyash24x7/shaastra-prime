import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/link-context";
import { WebSocketLink } from "@apollo/link-ws";

const [WS_URL, HTTP_URL] =
	process.env.NODE_ENV === "development"
		? ["ws://localhost:8000", "http://localhost:8000"]
		: ["wss://api.shaastra.org", "https://api.shaastra.org"];

const wsLink = new WebSocketLink({
	uri: WS_URL,
	options: {
		reconnect: true,
		connectionParams: async () => {
			const token = localStorage.getItem("authToken");
			return { Authorization: token ? `Bearer ${token}` : undefined };
		}
	}
});

const httpLink = new HttpLink({ uri: HTTP_URL });

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("authToken");
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
