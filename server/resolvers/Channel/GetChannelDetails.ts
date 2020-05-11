import { Arg, Authorized, Query, Resolver } from "type-graphql";
import { Channel } from "../../models/Channel";
import { prisma } from "../../prisma";

@Resolver()
export class GetChannelDetailsResolver {
	@Authorized()
	@Query(() => Channel)
	async getChannelDetails(@Arg("channelId") channelId: string) {
		const channel = await prisma.channel.findOne({ where: { id: channelId } });
		return channel;
	}
}
