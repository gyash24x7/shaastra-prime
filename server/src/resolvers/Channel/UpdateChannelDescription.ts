import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { UpdateChannelDescriptionInput } from "../../inputs/Channel/UpdateChannelDescription";
import { Channel } from "../../models/Channel";
import { Message } from "../../models/Message";
import { GraphQLContext, MessageType } from "../../utils";

@Resolver()
export class UpdateChannelDescriptionResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async updateChannel(
		@Arg("data") { description, channelId }: UpdateChannelDescriptionInput,
		@Ctx() { user }: GraphQLContext
	) {
		const { affected } = await Channel.update(channelId, { description });
		if (affected === 0) throw new Error("Channel Not Updated!");

		Message.create({
			type: MessageType.SYSTEM,
			content: `${user!.name} changed the Channel Description`,
			createdBy: Promise.resolve(user),
			channel: Channel.findOne(channelId)
		})
			.save()
			.then(() => console.log("Channel Update Message sent!"));

		return true;
	}
}
