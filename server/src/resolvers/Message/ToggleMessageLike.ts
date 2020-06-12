import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { Message } from "../../models/Message";
import { GraphQLContext } from "../../utils";

@Resolver()
export class ToggleMessageLikeResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async toggleMessageLike(
		@Arg("messageId") messageId: string,
		@Ctx() { user }: GraphQLContext
	) {
		let message = await Message.findOne(messageId);
		if (!message) return false;

		let likedBy = await message.likedBy;
		const userIndex = likedBy.findIndex(({ id }) => user.id === id);

		if (userIndex >= 0) likedBy = likedBy.splice(userIndex, 1);
		else likedBy.push(user);

		message.likedBy == Promise.resolve(likedBy);
		message = await message.save();

		return !!message;
	}
}
