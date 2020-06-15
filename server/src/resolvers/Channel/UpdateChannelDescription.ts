import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { UpdateChannelDescriptionInput } from "../../inputs/Channel";
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
			createdById: user.id,
			channels: Channel.findByIds([channelId])
		})
			.save()
			.then(() => console.log("Channel Update Message sent!"));

		return true;
	}
}
