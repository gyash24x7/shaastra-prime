import { MessageType } from "@prisma/client";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { AddUserToChannelInput } from "../../inputs/Channel/AddUserToChannel";
import { prisma } from "../../prisma";
import { GraphQLContext } from "../../utils";

@Resolver()
export class AddUserToChannelResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async addUserToChannel(
		@Arg("data") { channelId, userId }: AddUserToChannelInput,
		@Ctx() { req }: GraphQLContext
	) {
		const id = req.session!.id;
		const [currentUser, userToBeAdded] = await Promise.all([
			prisma.user.findOne({ where: { id } }),
			prisma.user.findOne({ where: { id: userId } })
		]);

		const channel = await prisma.channel.update({
			where: { id: channelId },
			data: {
				members: { connect: { id: userId } },
				messages: {
					create: {
						type: MessageType.SYSTEM,
						content: `${currentUser!.name} added ${userToBeAdded!.name}`,
						createdBy: { connect: { id } }
					}
				}
			}
		});

		return !!channel;
	}
}
