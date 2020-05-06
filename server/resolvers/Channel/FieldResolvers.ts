import { FieldResolver, Resolver, Root } from "type-graphql";
import { Channel } from "../../models/Channel";
import { prisma } from "../../prisma";

@Resolver(Channel)
export class ChannelFieldResolvers {
	@FieldResolver()
	createdBy(@Root() { id }: Channel) {
		return prisma.channel.findOne({ where: { id } }).createdBy();
	}

	@FieldResolver()
	members(@Root() { id }: Channel) {
		return prisma.channel.findOne({ where: { id } }).members();
	}
}
