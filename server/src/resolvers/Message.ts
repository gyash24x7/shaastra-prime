import {
	Arg,
	Authorized,
	Ctx,
	FieldResolver,
	Mutation,
	PubSub,
	PubSubEngine,
	Query,
	Resolver,
	Root,
	Subscription
} from "type-graphql";
import { Channel } from "../entities/Channel";
import { Media } from "../entities/Media";
import { Message } from "../entities/Message";
import {
	CreateMediaMessageInput,
	CreateTextMessageInput,
	GetMessagesInput
} from "../inputs/Message";
import { GraphQLContext, MediaType, MessageType } from "../utils";

@Resolver(Message)
export class MessageResolver {
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
			channels: Channel.findByIds([channelId]),
			createdBy: Promise.resolve(user),
			content: "",
			type: MessageType.MEDIA,
			media: Promise.all(media.map((obj) => obj.save()))
		}).save();

		await pubsub.publish(channelId, message);

		return !!message;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async createTextMessage(
		@Arg("data") { channelId, content }: CreateTextMessageInput,
		@Ctx() { user }: GraphQLContext,
		@PubSub() pubsub: PubSubEngine
	) {
		let message = await Message.create({
			channels: Channel.findByIds([channelId]),
			createdBy: Promise.resolve(user),
			content,
			type: MessageType.TEXT
		}).save();

		await pubsub.publish(channelId, message);

		return !!message;
	}

	@FieldResolver()
	async likes(@Root() { likedBy }: Message) {
		return (await likedBy).length;
	}

	@Authorized()
	@Query(() => [Message])
	async getMessages(@Arg("data") { channelId, skip }: GetMessagesInput) {
		const channel = await Channel.findOne(channelId);
		const messages = await channel?.messages;

		return messages?.reverse().slice((skip || 0) * 20, 20);
	}

	@Authorized()
	@Subscription(() => Message, { topics: ({ args }) => args.channelId })
	async newMessage(
		@Arg("channelId") _channelId: string,
		@Root() message: Message
	) {
		return message;
	}

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
