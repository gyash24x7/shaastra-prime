import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { Channel } from "../../models/Channel";

@Resolver()
export class DeleteChannelResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async deleteChannel(@Arg("channelId") channelId: string) {
		const { affected } = await Channel.delete(channelId);
		return !!affected;
	}
}
