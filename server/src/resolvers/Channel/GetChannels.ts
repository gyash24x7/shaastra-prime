import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { Channel } from "../../models/Channel";
import { GraphQLContext } from "../../utils";

@Resolver()
export class GetChannelsResolver {
	@Authorized()
	@Query(() => [Channel])
	async getChannels(@Ctx() { user }: GraphQLContext) {
		const channels = await user.channels;
		return channels;
	}
}
