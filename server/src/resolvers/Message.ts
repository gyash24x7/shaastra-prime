import cuid from "cuid";
import {
	Arg,
	Authorized,
	Ctx,
	Mutation,
	PubSub,
	PubSubEngine,
	Query,
	Resolver,
	Root,
	Subscription
} from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Message } from "../entities/Message";
import {
	CreateMediaMessageInput,
	CreateTextMessageInput,
	GetMessagesInput
} from "../inputs/Message";
import { ChannelRepository } from "../repositories/Channel";
import { MediaRepository } from "../repositories/Media";
import { MessageRepository } from "../repositories/Message";
import { GraphQLContext, MediaType, MessageType } from "../utils";

@Resolver(Message)
export class MessageResolver {
	@InjectRepository()
	private readonly msgRepo: MessageRepository;

	@InjectRepository()
	private readonly channelRepo: ChannelRepository;

	@InjectRepository()
	private readonly mediaRepo: MediaRepository;

	@Authorized()
	@Mutation(() => Boolean)
	async createMediaMessage(
		@Arg("data") { mediaUrls, channelId }: CreateMediaMessageInput,
		@Ctx() { user }: GraphQLContext,
		@PubSub() pubsub: PubSubEngine
	) {
		const channels = await this.channelRepo.findByIds([channelId]);

		let message = await this.msgRepo.save({
			channels,
			createdById: user.id,
			content: "",
			type: MessageType.MEDIA,
			id: cuid()
		});

		await this.mediaRepo.save(
			mediaUrls.map((url) => ({
				id: cuid(),
				url,
				uploadedById: user.id,
				type: MediaType.IMAGE,
				messageId: message.id
			}))
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
		const channels = await this.channelRepo.findByIds([channelId]);
		let message = await this.msgRepo.save({
			channels,
			createdById: user.id,
			content,
			type: MessageType.TEXT,
			id: cuid()
		});

		await pubsub.publish(channelId, message);

		return !!message;
	}

	@Authorized()
	@Query(() => [Message])
	async getMessages(@Arg("data") { channelId, skip }: GetMessagesInput) {
		const channel = await this.channelRepo.findOneOrFail(channelId, {
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
		let message = await this.msgRepo.findOneOrFail(messageId, {
			select: ["id", "starred"]
		});

		message.starred = !message.starred;
		message = await this.msgRepo.save(message);

		return !!message;
	}
}
