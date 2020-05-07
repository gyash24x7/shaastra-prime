import { ChannelUpdateInput, MessageType } from "@prisma/client";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { UpdateChannelInput } from "../../inputs/Channel/UpdateChannel";
import { prisma } from "../../prisma";
import { GraphQLContext } from "../../utils";

@Resolver()
export class UpdateChannelResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async updateChannel(
		@Arg("data") { description, channelId, archived }: UpdateChannelInput,
		@Ctx() { req }: GraphQLContext
	) {
		const { id, name } = (await prisma.user.findOne({
			where: { id: req.session!.userId }
		}))!;

		let updateData: ChannelUpdateInput = {};
		let messageContent: string = "";

		if (typeof archived !== undefined) {
			updateData = { archived };
			messageContent = `${name} archived this channel.`;
		} else {
			updateData = { description };
			messageContent = `${name} changed the Channel Description. Click to View.`;
		}

		const channel = await prisma.channel.update({
			where: { id: channelId },
			data: {
				...updateData,
				messages: {
					create: {
						type: MessageType.SYSTEM,
						content: messageContent,
						createdBy: { connect: { id } }
					}
				}
			}
		});

		return !!channel;
	}
}
