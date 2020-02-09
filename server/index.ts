import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { resolvers } from "./resolvers";
import { createConnection } from "typeorm";
import session from "express-session";
import connectRedis from "connect-redis";
import { redis } from "./utils/redis";
import cors from "cors";
import { GraphQLContext } from "./utils";
import { authChecker } from "./utils/authChecker";
require("dotenv").config();

const startServer = async () => {
	await createConnection();

	const schema = await buildSchema({ resolvers, authChecker });

	const server = new ApolloServer({
		schema,
		context: ({ req, res }) => ({ req, res } as GraphQLContext)
	});

	const app = express();

	const RedisStore = connectRedis(session);

	app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

	app.use(
		session({
			name: "qid",
			secret: process.env.COOKIE_SECRET!,
			cookie: {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				maxAge: 1000 * 60 * 60 * 24 * 28
			},
			saveUninitialized: false,
			resave: false,
			store: new RedisStore({ client: redis })
		})
	);

	server.applyMiddleware({ app, path: "/" });

	app.listen(8000, async () => {
		console.log("Server running on localhost:8000!");
	});
};

startServer();
