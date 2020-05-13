import { ApolloServer } from "apollo-server-express";
import bodyParser from "body-parser";
import connectRedis from "connect-redis";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import http from "http";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { resolvers } from "./resolvers";
import { GraphQLContext } from "./utils";
import { authChecker } from "./utils/authChecker";
import { redis } from "./utils/redis";
dotenv.config();

const startServer = async () => {
	const schema = await buildSchema({ resolvers, authChecker } as any);
	const server = new ApolloServer({
		schema,
		context: ({ req, res }) => ({ req, res } as GraphQLContext),
		subscriptions: {
			onConnect(val) {
				console.log(val);
			}
		}
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
			store: new RedisStore({ client: redis as any })
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

	const httpServer = http.createServer(app);
	server.installSubscriptionHandlers(httpServer);

	httpServer.listen(process.env.PORT || 8000, async () => {
		console.log("Server running on localhost:8000!");
	});
};

startServer();
