import { ApolloServer } from "apollo-server";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import entities from "./entities";
import resolvers from "./resolvers";
import { GraphQLContext } from "./utils";
import { authChecker } from "./utils/authChecker";
import { getAuthUser } from "./utils/getAuthUser";

const startServer = async () => {
	const schema = await buildSchema({ resolvers, authChecker });

	await createConnection({
		type: "postgres",
		url: process.env.DATABASE_URL,
		entities,
		synchronize: false,
		logging: true
	});

	const server = new ApolloServer({
		schema,
		context: async ({ req, connection }) => {
			const user = await getAuthUser({ req, connection });
			return { user } as GraphQLContext;
		},
		cors: {
			origin: ["http://localhost:3000", "https://prime.shaastra.org"],
			credentials: true
		},
		subscriptions: { path: "/" },
		engine: { apiKey: process.env.APOLLO_ENGINE_KEY }
	});

	server.listen(process.env.PORT || 8000).then(({ url }) => {
		console.log(`🚀  Server ready at ${url}`);
	});
};

startServer();
