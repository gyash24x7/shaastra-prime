import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";
import { GetMessagesInput } from "../../inputs/Message/GetMessages";
import { Message } from "../../models/Message";
import { GraphQLContext } from "../../utils";

@Resolver()
export class GetMessagesResolver {
	@Authorized()
	@Query(() => [Message])
	async getMessages(
		@Arg("data") { channelId, skip }: GetMessagesInput,
		@Ctx() { prisma }: GraphQLContext
	) {
		const messages = await prisma.message.findMany({
			where: { channelId },
			skip,
			first: 20,
			orderBy: { createdAt: "desc" }
		});

		return new Promise((resolve) => setTimeout(() => resolve(messages), 200));
	}
}
