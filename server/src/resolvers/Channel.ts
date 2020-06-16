import {
	Arg,
	Authorized,
	Ctx,
	FieldResolver,
	Mutation,
	Query,
	Resolver,
	Root
} from "type-graphql";
import { Channel } from "../entities/Channel";
import { Message } from "../entities/Message";
import { User } from "../entities/User";
import {
	AddUsersToChannelInput,
	CreateChannelInput,
	UpdateChannelDescriptionInput
} from "../inputs/Channel";
import { ChannelType, GraphQLContext, MessageType } from "../utils";

@Resolver(Channel)
export class ChannelResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async addUserToChannel(
		@Arg("data") { channelId, userIds }: AddUsersToChannelInput,
		@Ctx() { user }: GraphQLContext
	) {
		const usersToBeAdded = await User.findByIds(userIds);
		let channel = await Channel.findOne(channelId);

		if (!channel) {
			throw new Error("Channel Not Found!");
		}

		let members = await channel.members;
		members.push(...usersToBeAdded);
		channel = await channel?.save();

		Message.create({
			type: MessageType.SYSTEM,
			content: `${user!.name} added ${usersToBeAdded.map(
				({ name }) => name + ", "
			)}`,
			createdById: user.id,
			channels: Promise.resolve([] as Channel[])
		})
			.save()
			.then(() => {
				console.log("Channel Update Message sent!");
			});

		return !!channel;
	}

	@Authorized()
	async archiveChannel(
		@Arg("channelId") channelId: string,
		@Ctx() { user }: GraphQLContext
	) {
		const { affected } = await Channel.update(channelId, { archived: true });

		Message.create({
			type: MessageType.SYSTEM,
			content: `${user!.name} archived the Channel.`,
			createdById: user.id,
			channels: Channel.findByIds([channelId])
		})
			.save()
			.then(() => console.log("Channel Update Message sent!"));

		return !!affected;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async createChannel(
		@Arg("data") { memberIds, name, description }: CreateChannelInput,
		@Ctx() { user }: GraphQLContext
	) {
		const channel = await Channel.create({
			name,
			type: ChannelType.GROUP,
			description,
			members: User.findByIds(memberIds),
			createdBy: Promise.resolve(user)
		}).save();

		return !!channel;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async deleteChannel(@Arg("channelId") channelId: string) {
		const { affected } = await Channel.delete(channelId);
		return !!affected;
	}

	@FieldResolver()
	async starredMsgs(@Root() { messages }: Channel) {
		return (await messages).filter((msg) => msg.starred);
	}

	@Authorized()
	@Query(() => Channel)
	async getChannelDetails(@Arg("channelId") channelId: string) {
		const channel = await Channel.findOne(channelId);

		if (!channel) throw new Error("Channel Not Found!");
		return channel;
	}

	@Authorized()
	@Query(() => [Channel])
	async getChannels(@Ctx() { user }: GraphQLContext) {
		const channels = await user.channels;
		return channels;
	}

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
