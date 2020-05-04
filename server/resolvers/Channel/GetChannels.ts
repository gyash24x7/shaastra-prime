import { Query, Resolver } from "type-graphql";
import { Channel } from "../../models/Channel";
import { prisma } from "../../prisma";

@Resolver()
export class GetChannelsResolver {
	@Query(() => [Channel])
	getChannels() {
		return prisma.channel.findMany();
	}
}
