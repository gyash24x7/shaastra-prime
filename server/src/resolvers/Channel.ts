import cuid from "cuid";
import graphqlFields from "graphql-fields";
import {
	Arg,
	Authorized,
	Ctx,
	Info,
	Mutation,
	Query,
	Resolver
} from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Channel } from "../entities/Channel";
import {
	AddUsersToChannelInput,
	CreateChannelInput,
	UpdateChannelDescriptionInput
} from "../inputs/Channel";
import { ChannelRepository } from "../repositories/Channel";
import { MessageRepository } from "../repositories/Message";
import { UserRepository } from "../repositories/User";
import { ChannelType, GraphQLContext } from "../utils";
import getSelectionAndRelation from "../utils/getSelectionAndRelation";

@Resolver(Channel)
export class ChannelResolver {
	@InjectRepository()
	private readonly channelRepo: ChannelRepository;

	@InjectRepository()
	private readonly userRepo: UserRepository;

	@InjectRepository()
	private readonly msgRepo: MessageRepository;

	@Authorized()
	@Mutation(() => Boolean)
	async addUsersToChannel(
		@Arg("data") { channelId, userIds }: AddUsersToChannelInput,
		@Ctx() { user }: GraphQLContext
	) {
		const usersToBeAdded = await this.userRepo.findByIds(userIds);
		let channel = await this.channelRepo.findOneOrFail(channelId, {
			relations: ["members"]
		});

		channel.members.push(...usersToBeAdded);
		channel = await this.channelRepo.save(channel);

		let msgContent = `${user!.name} added ${usersToBeAdded.map(
			({ name }) => name + ", "
		)}`;

		this.msgRepo.sendSystemMessage(channel, msgContent, user.id).then(() => {
			console.log("Channel Update Message sent!");
		});

		return !!channel;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async archiveChannel(
		@Arg("channelId") channelId: string,
		@Ctx() { user }: GraphQLContext
	) {
		const channel = await this.channelRepo.save({
			id: channelId,
			archived: true
		});

		const msgContent = `${user!.name} archived the Channel.`;

		this.msgRepo.sendSystemMessage(channel, msgContent, user.id).then(() => {
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
		const channelMembers = await this.userRepo.findByIds(memberIds);
		const channel = await this.channelRepo.save({
			id: cuid(),
			name,
			type: ChannelType.GROUP,
			description,
			members: channelMembers,
			createdById: user.id,
			archived: false
		});

		return !!channel;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async deleteChannel(@Arg("channelId") channelId: string) {
		const { affected } = await this.channelRepo.delete(channelId);
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
			this.channelRepo
		);

		const channel = await this.channelRepo.findOneOrFail(channelId, {
			select,
			relations
		});

		return channel;
	}

	@Authorized()
	@Query(() => [Channel])
	async getChannels(@Ctx() { user }: GraphQLContext) {
		const { channels } = await this.userRepo.findOneOrFail(user.id, {
			relations: ["channels"]
		});
		return channels;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async updateChannelDescription(
		@Arg("data") { description, channelId }: UpdateChannelDescriptionInput,
		@Ctx() { user }: GraphQLContext
	) {
		const channel = await this.channelRepo.save({
			id: channelId,
			description
		});

		const msgContent = `${user!.name} changed the Channel Description`;

		this.msgRepo.sendSystemMessage(channel, msgContent, user.id).then(() => {
			console.log("Channel Update Message sent!");
		});

		return true;
	}
}
