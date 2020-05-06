import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";
import { Channel } from "../../models/Channel";
import { prisma } from "../../prisma";
import { ChannelType, GraphQLContext } from "../../utils";

@Resolver()
export class GetChannelsResolver {
	@Authorized()
	@Query(() => [Channel])
	getChannels(@Arg("type") type: ChannelType, @Ctx() { req }: GraphQLContext) {
		const id = req.session!.id;
		return prisma.user
			.findOne({ where: { id } })
			.channels({ where: { type, archived: false } });
	}
}
