import { PubSubEngine } from "apollo-server";
import {
	Arg,
	Authorized,
	Ctx,
	FieldResolver,
	Info,
	Mutation,
	PubSub,
	Query,
	Resolver,
	Root
} from "type-graphql";
import { Channel } from "../entities/Channel";
import { User } from "../entities/User";
import {
	AddUsersToChannelInput,
	CreateChannelInput,
	UpdateChannelDescriptionInput
} from "../inputs/Channel";
import { ChannelType, GraphQLContext } from "../utils";
import getSelectAndRelation from "../utils/getSelectAndRelation";

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

		let content = `${user!.name} added ${usersToBeAdded.map(
			({ name }) => name + ", "
		)}`;
		channel.members.push(...usersToBeAdded);
		await channel.save({ data: { user, pubsub, content } });
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
		const content = `${user!.name} archived the Channel.`;
		await channel.save({ data: { user, content, pubsub } });
		return !!channel;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async createChannel(
		@Arg("data") { memberIds, name, description }: CreateChannelInput,
		@Ctx() { user }: GraphQLContext
	) {
		const channel = new Channel();
		channel.name = name;
		channel.type = ChannelType.GROUP;
		channel.description = description;
		channel.members = await User.findByIds(memberIds);
		channel.createdById = user.id;
		await channel.save();
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
		const { select, relations } = getSelectAndRelation(info, Channel);
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
		const content = `${user!.name} changed the Channel Description`;
		await channel.save({ data: { user, pubsub, content } });
		return true;
	}

	@FieldResolver()
	async members(@Root() { members, id }: Channel) {
		if (members) return members;
		const channel = await Channel.findOneOrFail(id, { relations: ["members"] });
		return channel.members;
	}

	@FieldResolver()
	async createdBy(@Root() { createdById, createdBy }: Channel) {
		if (createdBy) return createdBy;
		return await User.findOneOrFail(createdById);
	}

	@FieldResolver()
	async connectedTasks(@Root() { connectedTasks, id }: Channel) {
		if (connectedTasks) return connectedTasks;
		const channel = await Channel.findOneOrFail(id, {
			relations: ["connectedTasks"]
		});
		return channel.connectedTasks;
	}

	@FieldResolver()
	async connectedInvoices(@Root() { connectedInvoices, id }: Channel) {
		if (connectedInvoices) return connectedInvoices;
		const channel = await Channel.findOneOrFail(id, {
			relations: ["connectedInvoices"]
		});
		return channel.connectedInvoices;
	}
}
