import { ApolloServer } from "apollo-server";
import dotenv from "dotenv";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { Container as container } from "typedi";
import { createConnection, useContainer } from "typeorm";
import entities from "./entities";
import { UserRepository } from "./repositories/User";
import resolvers from "./resolvers";
import subscribers from "./subscribers";
import { GraphQLContext } from "./utils";
import { authChecker } from "./utils/authChecker";
import { getAuthUser } from "./utils/getAuthUser";

dotenv.config();

useContainer(container);

const startServer = async () => {
	const schema = await buildSchema({ resolvers, authChecker, container });

	let dbConnection = await createConnection({
		type: "postgres",
		url: process.env.DATABASE_URL,
		entities,
		synchronize: false,
		logging: true,
		subscribers
	});

	const server = new ApolloServer({
		schema,
		context: async ({ req, connection }) => {
			const user = await getAuthUser({
				req,
				connection,
				userRepo: dbConnection.getCustomRepository(UserRepository)
			});
			return { user } as GraphQLContext;
		},
		cors: {
			origin: ["http://localhost:3000", "https://prime.shaastra.org"],
			credentials: true
		},
		subscriptions: { path: "/" },
		playground: true,
		introspection: true,
		engine: { apiKey: process.env.APOLLO_ENGINE_KEY }
	});

	server.listen(8000).then(({ url }) => {
		console.log(`🚀  Server ready at ${url}`);
	});
};

startServer();
