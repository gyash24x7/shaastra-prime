import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";
import { Channel } from "../../models/Channel";
import { GraphQLContext } from "../../utils";

@Resolver()
export class GetChannelDetailsResolver {
	@Authorized()
	@Query(() => Channel)
	async getChannelDetails(
		@Arg("channelId") channelId: string,
		@Ctx() { prisma }: GraphQLContext
	) {
		const channel = await prisma.channel.findOne({ where: { id: channelId } });
		return channel;
	}
}
