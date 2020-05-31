import { Arg, Authorized, Resolver, Root, Subscription } from "type-graphql";
import { Message } from "../../models/Message";

@Resolver()
export class NewMessageResolver {
	@Authorized()
	@Subscription(() => Message, { topics: ({ args }) => args.channelId })
	async newMessage(
		@Arg("channelId") channelId: string,
		@Root() message: Message
	) {
		console.log(channelId);
		return message;
	}
}