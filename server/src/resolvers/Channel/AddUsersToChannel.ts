import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { AddUsersToChannelInput } from "../../inputs/Channel/AddUsersToChannel";
import { Channel } from "../../models/Channel";
import { Message } from "../../models/Message";
import { User } from "../../models/User";
import { GraphQLContext, MessageType } from "../../utils";
@Resolver()
export class AddUsersToChannelResolver {
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
			createdBy: Promise.resolve(user),
			channel: Promise.resolve(channel)
		})
			.save()
			.then(() => {
				console.log("Channel Update Message sent!");
			});

		return !!channel;
	}
}
