import { ApolloServer } from "apollo-server";
import dotenv from "dotenv";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { getAuthUser } from "utils/getAuthUser";
import { resolvers } from "./resolvers";
dotenv.config();

const startServer = async () => {
	const schema = await buildSchema({ resolvers } as any);
	const server = new ApolloServer({
		schema,
		context: async ({ req, connection }) => {
			const user = await getAuthUser({ req, connection });
			return { user };
		}
	});
	server.listen(8000).then(({ url }) => {
		console.log(`🚀  Server ready at ${url}`);
	});
};

startServer();
