import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server";
import dotenv from "dotenv";
import mailjet from "node-mailjet";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { resolvers } from "./resolvers";
import { authChecker } from "./utils/authChecker";
import { getAuthUser } from "./utils/getAuthUser";

dotenv.config();

const startServer = async () => {
	const schema = await buildSchema({ resolvers, authChecker } as any);
	const server = new ApolloServer({
		schema,
		context: async ({ req, connection }) => {
			const prisma = new PrismaClient();
			const user = await getAuthUser({ req, connection, prisma });
			return {
				user,
				prisma,
				mailjet: mailjet.connect(
					process.env.MAILJET_APIKEY!,
					process.env.MAILJET_APISECRET!
				)
			};
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
