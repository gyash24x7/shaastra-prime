import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { CreateChannelInput } from "../../inputs/Channel/CreateChannel";
import { Channel } from "../../models/Channel";
import { prisma } from "../../prisma";
import { ChannelType, GraphQLContext } from "../../utils";

@Resolver()
export class CreateChannelResolver {
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
				type: ChannelType.GROUP,
				description,
				members: { connect: members.map((id) => ({ id })) },
				createdBy: { connect: { id: userId } }
			}
		});
	}
}
