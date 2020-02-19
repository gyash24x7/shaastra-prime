import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: new HttpLink({
		uri: "http://localhost:8000/",
		credentials: "include"
	})
});
