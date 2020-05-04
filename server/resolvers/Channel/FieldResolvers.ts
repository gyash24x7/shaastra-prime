import { Channel } from "@prisma/client";
import { FieldResolver, Resolver, Root } from "type-graphql";
import { prisma } from "../../prisma";

@Resolver()
export class ChannelFieldResolvers {
	@FieldResolver()
	createdBy(@Root() { id }: Channel) {
		return prisma.channel.findOne({ where: { id } }).createdBy();
	}
}
