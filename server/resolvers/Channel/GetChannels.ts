import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { Channel } from "../../models/Channel";
import { prisma } from "../../prisma";
import { GraphQLContext } from "../../utils";

@Resolver()
export class GetChannelsResolver {
	@Authorized()
	@Query(() => [Channel])
	async getChannels(@Ctx() { user }: GraphQLContext) {
		const channels = await prisma.user
			.findOne({ where: { id: user!.id } })
			.channels({ where: { archived: false } });

		return channels;
	}
}
