import { PubSubEngine } from "apollo-server";
import graphqlFields from "graphql-fields";
import {
	Arg,
	Authorized,
	Ctx,
	Info,
	Mutation,
	PubSub,
	Query,
	Resolver
} from "type-graphql";
import { Channel } from "../entities/Channel";
import { Message } from "../entities/Message";
import { User } from "../entities/User";
import {
	AddUsersToChannelInput,
	CreateChannelInput,
	UpdateChannelDescriptionInput
} from "../inputs/Channel";
import { ChannelType, GraphQLContext } from "../utils";
import getSelectionAndRelation from "../utils/getSelectionAndRelation";

@Resolver(Channel)
export class ChannelResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async addUsersToChannel(
		@Arg("data") { channelId, userIds }: AddUsersToChannelInput,
		@Ctx() { user }: GraphQLContext,
		@PubSub() pubsub: PubSubEngine
	) {
		const usersToBeAdded = await User.findByIds(userIds);
		let channel = await Channel.findOneOrFail(channelId, {
			relations: ["members"]
		});

		channel.members.push(...usersToBeAdded);
		await channel.save();

		let msgContent = `${user!.name} added ${usersToBeAdded.map(
			({ name }) => name + ", "
		)}`;

		Message.sendSystemMessage(channel, msgContent, user.id, pubsub).then(() => {
			console.log("Channel Update Message sent!");
		});

		return !!channel;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async archiveChannel(
		@Arg("channelId") channelId: string,
		@Ctx() { user }: GraphQLContext,
		@PubSub() pubsub: PubSubEngine
	) {
		const channel = await Channel.findOneOrFail(channelId);
		channel.archived = true;
		await channel.save();

		const msgContent = `${user!.name} archived the Channel.`;

		Message.sendSystemMessage(channel, msgContent, user.id, pubsub).then(() => {
			console.log("Channel Update Message sent!");
		});

		return !!channel;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async createChannel(
		@Arg("data") { memberIds, name, description }: CreateChannelInput,
		@Ctx() { user }: GraphQLContext
	) {
		const channelMembers = await User.findByIds(memberIds);
		const channel = await Channel.create({
			name,
			type: ChannelType.GROUP,
			description,
			members: channelMembers,
			createdById: user.id,
			archived: false
		}).save();

		return !!channel;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async deleteChannel(@Arg("channelId") channelId: string) {
		const { affected } = await Channel.delete(channelId);
		return !!affected;
	}

	@Authorized()
	@Query(() => Channel)
	async getChannelDetails(
		@Arg("channelId") channelId: string,
		@Info() info: any
	) {
		const { select, relations } = getSelectionAndRelation(
			graphqlFields(info),
			Channel
		);

		const channel = await Channel.findOneOrFail(channelId, {
			select,
			relations
		});

		return channel;
	}

	@Authorized()
	@Query(() => [Channel])
	async getChannels(@Ctx() { user }: GraphQLContext) {
		const { channels } = await User.findOneOrFail(user.id, {
			relations: ["channels"]
		});
		return channels;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async updateChannelDescription(
		@Arg("data") { description, channelId }: UpdateChannelDescriptionInput,
		@Ctx() { user }: GraphQLContext,
		@PubSub() pubsub: PubSubEngine
	) {
		const channel = await Channel.findOneOrFail(channelId);
		channel.description = description;
		await channel.save();

		const msgContent = `${user!.name} changed the Channel Description`;

		Message.sendSystemMessage(channel, msgContent, user.id, pubsub).then(() => {
			console.log("Channel Update Message sent!");
		});

		return true;
	}
}
