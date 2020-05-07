import { MessageType } from "@prisma/client";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { CreateMessageInput } from "../../inputs/Message/CreateMessage";
import { prisma } from "../../prisma";
import { getMediaType, GraphQLContext } from "../../utils";

@Resolver()
export class CreateMessageResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async createMessage(
		@Arg("data") { channelId, content, media, mediaType }: CreateMessageInput,
		@Ctx() { req }: GraphQLContext
	) {
		const id = req.session!.userId;
		let message = await prisma.message.create({
			data: {
				channel: { connect: { id: channelId } },
				createdBy: { connect: { id } },
				content,
				type: mediaType ? MessageType.MEDIA : MessageType.TEXT,
				media: {
					create: media.map((url) => ({
						url,
						type: getMediaType(mediaType!),
						uploadedBy: { connect: { id } }
					}))
				}
			}
		});

		return !!message;
	}
}
