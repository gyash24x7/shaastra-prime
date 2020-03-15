import "reflect-metadata";

import { ApolloServer } from "apollo-server-express";
import bodyParser from "body-parser";
import connectRedis from "connect-redis";
import express from "express";
import session from "express-session";
import path from "path";
import { buildSchema } from "type-graphql";
import { createConnection, getConnectionOptions } from "typeorm";

import { resolvers } from "./resolvers";
import { GraphQLContext } from "./utils";
import { authChecker } from "./utils/authChecker";
import { redis } from "./utils/redis";

const startServer = async () => {
	const connectionOptions = await getConnectionOptions();
	await createConnection({ ...connectionOptions, entities: ["models/*.ts"] });

	const schema = await buildSchema({ resolvers, authChecker });

	const server = new ApolloServer({
		schema,
		context: ({ req, res }) => ({ req, res } as GraphQLContext)
	});

	const app = express();

	const RedisStore = connectRedis(session);
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

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
	app.use(express.static(path.join(__dirname, "..", "web", "build")));
	app.get("*", (_, res) => {
		res.sendFile(path.join(__dirname, "..", "web", "build", "index.html"));
	});

	server.applyMiddleware({
		app,
		path: "/",
		cors: { credentials: true, origin: "http://localhost:3000" }
	});

	app.listen(8000, async () => {
		console.log("Server running on localhost:8000!");
	});
};

startServer();
