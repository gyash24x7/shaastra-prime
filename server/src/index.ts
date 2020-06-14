import { ApolloServer } from "apollo-server";
import dotenv from "dotenv";
import mailjet from "node-mailjet";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { Channel } from "./models/Channel";
import { Department } from "./models/Department";
import { Event } from "./models/Event";
import { Goal } from "./models/Goal";
import { Invoice } from "./models/Invoice";
import { InvoiceActivity } from "./models/InvoiceActivity";
import { Media } from "./models/Media";
import { Message } from "./models/Message";
import { Milestone } from "./models/Milestone";
import { Participant } from "./models/Participant";
import { Registration } from "./models/Registration";
import { Task } from "./models/Task";
import { TaskActivity } from "./models/TaskActivity";
import { Team } from "./models/Team";
import { TeamInvitation } from "./models/TeamInvitation";
import { Update } from "./models/Update";
import { User } from "./models/User";
import { Vendor } from "./models/Vendor";
import { Vertical } from "./models/Vertical";
import { resolvers } from "./resolvers";
import { GraphQLContext } from "./utils";
import { authChecker } from "./utils/authChecker";
import { getAuthUser } from "./utils/getAuthUser";

dotenv.config();

const startServer = async () => {
	const schema = await buildSchema({ resolvers, authChecker } as any);

	await createConnection({
		type: "postgres",
		url: process.env.DATABASE_URL,
		entities: [
			Department,
			Channel,
			Event,
			Goal,
			Invoice,
			InvoiceActivity,
			Media,
			Message,
			Milestone,
			Participant,
			Registration,
			Task,
			TaskActivity,
			Team,
			TeamInvitation,
			Update,
			User,
			Vendor,
			Vertical
		],
		synchronize: true,
		logging: true
	});

	const server = new ApolloServer({
		schema,
		context: async ({ req, connection }) => {
			const user = await getAuthUser({ req, connection });
			return {
				user,
				mailjet: mailjet.connect(
					process.env.MAILJET_APIKEY!,
					process.env.MAILJET_APISECRET!
				)
			} as GraphQLContext;
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
