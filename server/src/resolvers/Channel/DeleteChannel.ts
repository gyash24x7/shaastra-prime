import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { GraphQLContext } from "../../utils";
@Resolver()
export class DeleteChannelResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async deleteChannel(
		@Arg("channelId") channelId: string,
		@Ctx() { prisma }: GraphQLContext
	) {
		const channel = await prisma.channel.delete({ where: { id: channelId } });
		return !!channel;
	}
}
