import {
	Arg,
	Authorized,
	Ctx,
	Mutation,
	PubSub,
	PubSubEngine,
	Resolver
} from "type-graphql";
import { CreateMessageInput } from "../../inputs/Message/CreateTextMessage";
import { Channel } from "../../models/Channel";
import { Message } from "../../models/Message";
import { GraphQLContext, MessageType } from "../../utils";

@Resolver()
export class CreateTextMessageResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async createTextMessage(
		@Arg("data") { channelId, content }: CreateMessageInput,
		@Ctx() { user }: GraphQLContext,
		@PubSub() pubsub: PubSubEngine
	) {
		let message = await Message.create({
			channel: Channel.findOne(channelId),
			createdBy: Promise.resolve(user),
			content,
			type: MessageType.TEXT
		}).save();

		await pubsub.publish(channelId, message);

		return !!message;
	}
}
