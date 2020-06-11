import { Arg, Authorized, Ctx, Resolver } from "type-graphql";
import { Channel } from "../../models/Channel";
import { Message } from "../../models/Message";
import { GraphQLContext, MessageType } from "../../utils";

@Resolver()
export class ArchiveChannelResolver {
	@Authorized()
	async archiveChannel(
		@Arg("channelId") channelId: string,
		@Ctx() { user }: GraphQLContext
	) {
		const { affected } = await Channel.update(channelId, { archived: true });

		Message.create({
			type: MessageType.SYSTEM,
			content: `${user!.name} archived the Channel.`,
			createdBy: Promise.resolve(user),
			channel: Channel.findOne(channelId)
		})
			.save()
			.then(() => console.log("Channel Update Message sent!"));

		return !!affected;
	}
}
