import { FieldResolver, Resolver, Root } from "type-graphql";
import { Message } from "../../models/Message";

@Resolver(Message)
export class MessageFieldResolvers {
	@FieldResolver()
	async likes(@Root() { likedBy }: Message) {
		return (await likedBy).length;
	}
}
