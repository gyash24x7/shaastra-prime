import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { Message } from "../../models/Message";

@Resolver()
export class ToggleMessageStarResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async toggleMessageStar(@Arg("messageId") messageId: string) {
		let message = await Message.findOne(messageId);
		if (!message) return false;

		message.starred = !message.starred;
		message = await message.save();

		return !!message;
	}
}
