import "reflect-metadata";
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server";
import { resolvers } from "./resolvers";
require("dotenv").config();

const startServer = async () => {
	await createConnection();
	const schema = await buildSchema({ resolvers });
	const server = new ApolloServer({ schema });
	await server.listen(8000);
	console.log("Server running on PORT 8000!");
};

startServer();
