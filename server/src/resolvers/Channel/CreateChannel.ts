import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { CreateChannelInput } from "../../inputs/Channel";
import { Channel } from "../../models/Channel";
import { User } from "../../models/User";
import { ChannelType, GraphQLContext } from "../../utils";

@Resolver()
export class CreateChannelResolver {
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
}
