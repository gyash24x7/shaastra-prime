import { makePrismaClientClass } from "prisma-client-lib";
import { ClientConstructor, models, Prisma } from "./generated";
import { typeDefs } from "./generated/prisma-schema";

require( "dotenv" ).config();

const PrismaClient = makePrismaClientClass<ClientConstructor<Prisma>>( {
	typeDefs,
	secret : process.env.PRISMA_SERVICE_SECRET,
	endpoint : process.env.PRISMA_ENDPOINT,
	models
} );

export const prisma = new PrismaClient();
