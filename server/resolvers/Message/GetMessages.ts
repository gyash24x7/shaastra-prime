import { Arg, Authorized, Query, Resolver } from "type-graphql";
import { GetMessagesInput } from "../../inputs/Message/GetMessages";
import { Message } from "../../models/Message";
import { prisma } from "../../prisma";

@Resolver()
export class GetMessagesResolver {
	@Authorized()
	@Query(() => [Message])
	async getMessages(@Arg("data") { channelId, skip, first }: GetMessagesInput) {
		const messageCount = await prisma.message.count({ where: { channelId } });

		const messages = await prisma.channel
			.findOne({ where: { id: channelId } })
			.messages({
				skip: messageCount - skip * first,
				first
			});

		return messages;
	}
}
