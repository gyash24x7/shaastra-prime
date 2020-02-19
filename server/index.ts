import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { resolvers } from "./resolvers";
import { createConnection, getConnectionOptions } from "typeorm";
import session from "express-session";
import connectRedis from "connect-redis";
import { redis } from "./utils/redis";
// import cors from "cors";
import { GraphQLContext } from "./utils";
import { authChecker } from "./utils/authChecker";
import bodyParser from "body-parser";
require("dotenv").config();

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

	// app.use(cors());
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
