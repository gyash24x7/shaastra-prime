import cuid from "cuid";
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
import { InvoiceActivity } from "../entities/InvoiceActivity";
import { Media } from "../entities/Media";
import { Message } from "../entities/Message";
import { TaskActivity } from "../entities/TaskActivity";
import { User } from "../entities/User";
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
		let message = new Message();
		message.channels = await Channel.findByIds([channelId]);
		message.createdById = user.id;
		message.content = "";
		message.type = MessageType.MEDIA;

		message = await message.save();

		await Promise.all(
			mediaUrls.map((url) =>
				Media.create({
					id: cuid(),
					url,
					uploadedById: user.id,
					type: MediaType.IMAGE,
					messageId: message.id
				}).save()
			)
		);

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
		let message = new Message();
		message.channels = await Channel.findByIds([channelId]);
		message.createdById = user.id;
		message.content = content;
		message.type = MessageType.TEXT;

		message = await message.save({ data: { channelIds: [channelId], pubsub } });

		return !!message;
	}

	@Authorized()
	@Query(() => [Message])
	async getMessages(@Arg("data") { channelId, skip }: GetMessagesInput) {
		const channel = await Channel.findOneOrFail(channelId, {
			relations: ["messages"]
		});
		return channel.messages.reverse().slice((skip || 0) * 20, 20);
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
	async toggleMessageStar(@Arg("messageId") messageId: string) {
		let message = await Message.findOneOrFail(messageId, {
			select: ["id", "starred"]
		});

		message.starred = !message.starred;
		message = await Message.save(message);

		return !!message;
	}

	@FieldResolver()
	async taskActivity(@Root() { taskActivity, taskActivityId }: Message) {
		if (taskActivity) return taskActivity;
		return TaskActivity.findOne(taskActivityId);
	}

	@FieldResolver()
	async invoiceActivity(
		@Root() { invoiceActivity, invoiceActivityId }: Message
	) {
		if (invoiceActivity) return invoiceActivity;
		return InvoiceActivity.findOne(invoiceActivityId);
	}

	@FieldResolver()
	async createdBy(@Root() { createdBy, createdById }: Message) {
		if (createdBy) return createdBy;
		return User.findOne(createdById);
	}

	@FieldResolver()
	async media(@Root() { media, id }: Message) {
		if (media) return media;
		return Media.find({ where: { messageId: id } });
	}
}
