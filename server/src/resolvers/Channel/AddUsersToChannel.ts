import { MessageType } from "@prisma/client";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { AddUsersToChannelInput } from "../../inputs/Channel/AddUsersToChannel";
import { GraphQLContext } from "../../utils";
@Resolver()
export class AddUsersToChannelResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async addUserToChannel(
		@Arg("data") { channelId, userIds }: AddUsersToChannelInput,
		@Ctx() { user, prisma }: GraphQLContext
	) {
		const usersToBeAdded = await prisma.user.findMany({
			where: { id: { in: userIds } }
		});

		const channel = await prisma.channel.update({
			where: { id: channelId },
			data: {
				members: { connect: usersToBeAdded.map(({ id }) => ({ id })) },
				messages: {
					create: {
						type: MessageType.SYSTEM,
						content: `${user!.name} added ${usersToBeAdded.map(
							({ name }) => name + ", "
						)}`,
						createdBy: { connect: { id: user!.id } }
					}
				}
			}
		});

		return !!channel;
	}
}
