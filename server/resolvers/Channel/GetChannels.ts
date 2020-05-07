import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";
import { Channel } from "../../models/Channel";
import { prisma } from "../../prisma";
import { getChannelType, GraphQLContext } from "../../utils";

@Resolver()
export class GetChannelsResolver {
	@Authorized()
	@Query(() => [Channel])
	async getChannels(@Arg("type") type: string, @Ctx() { req }: GraphQLContext) {
		const id = req.session!.userId;

		const channels = await prisma.user
			.findOne({ where: { id } })
			.channels({ where: { type: getChannelType(type), archived: false } });

		return channels;
	}
}
