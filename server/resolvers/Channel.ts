import {
  Arg,
  Authorized,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root
} from "type-graphql";

import { CreateChannelInput } from "../inputs/Channel/CreateChannel";
import { Channel } from "../models/Channel";
import { User } from "../models/User";

@Resolver(Channel)
export class ChannelResolver {
	@Authorized()
	@Mutation(() => Channel)
	async createChannel(
		@Arg("data") { members, name, description }: CreateChannelInput
	) {
		const channel = new Channel();
		channel.name = name;
		channel.description = description;
		channel.members = await User.find({ where: { id: [members] } });
	}

	@FieldResolver()
	createdBy(@Root() { createdById }: Channel) {
		return User.findOne(createdById);
	}

	@Query(() => [Channel])
	getChannels() {
		return Channel.find();
	}
}
