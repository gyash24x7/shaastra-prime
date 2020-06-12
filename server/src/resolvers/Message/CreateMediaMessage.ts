import {
	Arg,
	Authorized,
	Ctx,
	Mutation,
	PubSub,
	PubSubEngine,
	Resolver
} from "type-graphql";
import { CreateMediaMessageInput } from "../../inputs/Message/CreateMediaMessage";
import { Channel } from "../../models/Channel";
import { Media } from "../../models/Media";
import { Message } from "../../models/Message";
import { GraphQLContext, MediaType, MessageType } from "../../utils";

@Resolver()
export class CreateMediaMessageResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async createMediaMessage(
		@Arg("data") { mediaUrls, channelId }: CreateMediaMessageInput,
		@Ctx() { user }: GraphQLContext,
		@PubSub() pubsub: PubSubEngine
	) {
		const media = Media.create(
			mediaUrls.map((url) => ({
				url,
				uploadedBy: Promise.resolve(user),
				type: MediaType.IMAGE
			}))
		);

		let message = await Message.create({
			channel: Channel.findOne(channelId),
			createdBy: Promise.resolve(user),
			content: "",
			type: MessageType.MEDIA,
			media: Promise.all(media.map((obj) => obj.save()))
		}).save();

		await pubsub.publish(channelId, message);

		return !!message;
	}
}
