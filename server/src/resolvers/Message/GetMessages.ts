import { Arg, Authorized, Query, Resolver } from "type-graphql";
import { GetMessagesInput } from "../../inputs/Message/GetMessages";
import { Channel } from "../../models/Channel";
import { Message } from "../../models/Message";

@Resolver()
export class GetMessagesResolver {
	@Authorized()
	@Query(() => [Message])
	async getMessages(@Arg("data") { channelId, skip }: GetMessagesInput) {
		const channel = await Channel.findOne(channelId);
		const messages = await channel?.messages;

		return messages?.reverse().slice((skip || 0) * 20, 20);
	}
}
