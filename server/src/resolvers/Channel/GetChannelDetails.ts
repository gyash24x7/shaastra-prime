import { Arg, Authorized, Query, Resolver } from "type-graphql";
import { Channel } from "../../models/Channel";

@Resolver()
export class GetChannelDetailsResolver {
	@Authorized()
	@Query(() => Channel)
	async getChannelDetails(@Arg("channelId") channelId: string) {
		const channel = await Channel.findOne(channelId);

		if (!channel) throw new Error("Channel Not Found!");
		return channel;
	}
}
