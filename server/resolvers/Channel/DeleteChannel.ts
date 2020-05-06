import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { prisma } from "../../prisma";

@Resolver()
export class DeleteChannelResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async deleteChannel(@Arg("channelId") channelId: string) {
		const channel = await prisma.channel.delete({ where: { id: channelId } });
		return !!channel;
	}
}
