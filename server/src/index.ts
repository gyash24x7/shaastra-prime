import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server";
import dotenv from "dotenv";
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
			const prisma = new PrismaClient({
				datasources: {
					db: `postgresql://${process.env.POSTGRES_USER}:${
						process.env.POSTGRES_PASSWORD
					}@${
						process.env.NODE_ENV === "production"
							? "host.docker.internal"
							: "localhost"
					}:5432/${process.env.POSTGRES_DB}`
				}
			});
			const user = await getAuthUser({ req, connection, prisma });
			return { user, prisma };
		},
		cors: { origin: "http://localhost:3000", credentials: true },
		subscriptions: { path: "/" },
		playground: true
	});
	server.listen(8000).then(({ url }) => {
		console.log(`🚀  Server ready at ${url}`);
	});
};

startServer();
