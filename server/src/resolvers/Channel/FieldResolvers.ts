import { FieldResolver, Resolver, Root } from "type-graphql";
import { Channel } from "../../models/Channel";

@Resolver(Channel)
export class ChannelFieldResolvers {
	@FieldResolver()
	async starredMsgs(@Root() { messages }: Channel) {
		return (await messages).filter((msg) => msg.starred);
	}
}
