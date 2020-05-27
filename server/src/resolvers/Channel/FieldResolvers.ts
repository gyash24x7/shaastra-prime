import { Ctx, FieldResolver, Resolver, Root } from "type-graphql";
import { Channel } from "../../models/Channel";
import { GraphQLContext } from "../../utils";

@Resolver(Channel)
export class ChannelFieldResolvers {
	@FieldResolver()
	createdBy(@Root() { id }: Channel, @Ctx() { prisma }: GraphQLContext) {
		return prisma.channel.findOne({ where: { id } }).createdBy();
	}

	@FieldResolver()
	members(@Root() { id }: Channel, @Ctx() { prisma }: GraphQLContext) {
		return prisma.channel.findOne({ where: { id } }).members();
	}

	@FieldResolver()
	connectedTasks(@Root() { id }: Channel, @Ctx() { prisma }: GraphQLContext) {
		return prisma.channel.findOne({ where: { id } }).connectedTasks();
	}

	@FieldResolver()
	starredMsgs(@Root() { id }: Channel, @Ctx() { prisma }: GraphQLContext) {
		return prisma.channel
			.findOne({ where: { id } })
			.messages({ where: { starred: true } });
	}
}
