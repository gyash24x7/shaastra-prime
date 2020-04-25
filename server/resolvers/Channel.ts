import {
	Arg,
	Authorized,
	Ctx,
	FieldResolver,
	Mutation,
	Query,
	Resolver,
	Root
} from "type-graphql";
import { CreateChannelInput } from "../inputs/Channel/CreateChannel";
import { Channel } from "../models/Channel";
import { prisma } from "../prisma";
import { GraphQLContext } from "../utils";

@Resolver(Channel)
export class ChannelResolver {
	@Authorized()
	@Mutation(() => Channel)
	async createChannel(
		@Arg("data") { members, name, description }: CreateChannelInput,
		@Ctx() { req }: GraphQLContext
	) {
		let userId: string = req.session!.userId;
		return prisma.channel.create({
			data: {
				name,
				description,
				members: { connect: members.map((id) => ({ id })) },
				createdBy: { connect: { id: userId } }
			}
		});
	}

	@FieldResolver()
	createdBy(@Root() { id }: Channel) {
		return prisma.channel.findOne({ where: { id } }).createdBy();
	}

	@Query(() => [Channel])
	getChannels() {
		return prisma.channel.findMany();
	}
}
