import { UseGuards, ValidationPipe } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "@prisma/client";
import { AuthUser } from "../auth/auth-user.decorator";
import { UserGuard } from "../auth/user.guard";
import {
	AddUsersToChannelInput,
	CreateChannelInput,
	UpdateChannelDescriptionInput
} from "./channel.inputs";
import { ChannelService } from "./channel.service";
import { ChannelType } from "./channel.type";

@Resolver(() => ChannelType)
export class ChannelResolver {
	constructor(private readonly channelService: ChannelService) {}

	@UseGuards(UserGuard)
	@Query(() => ChannelType)
	async getChannel(@Args("channelId") channelId: string) {
		return this.channelService.getChannel(channelId);
	}

	@UseGuards(UserGuard)
	@Query(() => ChannelType)
	async getChannels(@AuthUser() user: User) {
		return this.channelService.getChannels(user);
	}

	@UseGuards(UserGuard)
	@Mutation(() => Boolean)
	async createChannel(
		@Args("data", ValidationPipe) data: CreateChannelInput,
		@AuthUser() user: User
	) {
		await this.channelService.createChannel(data, user);
		return true;
	}

	@UseGuards(UserGuard)
	@Mutation(() => Boolean)
	async updateChannelDescription(
		@Args("data", ValidationPipe) data: UpdateChannelDescriptionInput
	) {
		await this.channelService.updateChannelDescription(data);
		return true;
	}

	@UseGuards(UserGuard)
	@Mutation(() => Boolean)
	async archiveChannel(@Args("channelId") channelId: string) {
		await this.channelService.archiveChannel(channelId);
		return true;
	}

	@UseGuards(UserGuard)
	@Mutation(() => Boolean)
	async deleteChannel(@Args("channelId") channelId: string) {
		await this.channelService.deleteChannel(channelId);
		return true;
	}

	@UseGuards(UserGuard)
	@Mutation(() => Boolean)
	async addUsersToChannel(
		@Args("data", ValidationPipe) data: AddUsersToChannelInput
	) {
		await this.channelService.addUsersToChannel(data);
		return true;
	}
}
