import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { CreateChannelInput } from "../../inputs/Channel/CreateChannel";
import { prisma } from "../../prisma";
import { ChannelType, GraphQLContext } from "../../utils";

@Resolver()
export class CreateChannelResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async createChannel(
		@Arg("data") { members, name, description }: CreateChannelInput,
		@Ctx() { req }: GraphQLContext
	) {
		let userId: string = req.session!.userId;
		const channel = await prisma.channel.create({
			data: {
				name,
				type: ChannelType.GROUP,
				description,
				members: { connect: members.map((id) => ({ id })) },
				createdBy: { connect: { id: userId } }
			}
		});

		return !!channel;
	}
}
