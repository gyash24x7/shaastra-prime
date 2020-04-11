import "reflect-metadata";

import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-express";
import bodyParser from "body-parser";
import connectRedis from "connect-redis";
import express from "express";
import session from "express-session";
import { buildSchema } from "type-graphql";

import { resolvers } from "./resolvers";
import { GraphQLContext } from "./utils";
import { authChecker } from "./utils/authChecker";
import { redis } from "./utils/redis";

require("dotenv").config();

const startServer = async () => {
	const schema = await buildSchema({ resolvers, authChecker });
	const prisma = new PrismaClient();
	const server = new ApolloServer({
		schema,
		context: ({ req, res }) => ({ req, res, prisma } as GraphQLContext)
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
	// app.use(express.static(path.join(__dirname, "..", "web", "build")));
	// app.get("*", (_, res) => {
	// 	res.sendFile(path.join(__dirname, "..", "web", "build", "index.html"));
	// });

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
