import { MessageType } from "@prisma/client";
import {
	Arg,
	Authorized,
	Ctx,
	Mutation,
	PubSub,
	PubSubEngine,
	Resolver
} from "type-graphql";
import { CreateMessageInput } from "../../inputs/Message/CreateMessage";
import { getMediaType, GraphQLContext } from "../../utils";

@Resolver()
export class CreateMessageResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async createMessage(
		@Arg("data") { channelId, content, media, mediaType }: CreateMessageInput,
		@Ctx() { user, prisma }: GraphQLContext,
		@PubSub() pubsub: PubSubEngine
	) {
		let message = await prisma.message.create({
			data: {
				channel: { connect: { id: channelId } },
				createdBy: { connect: { id: user!.id } },
				content,
				type: mediaType ? MessageType.MEDIA : MessageType.TEXT,
				media: {
					create: media.map((url) => ({
						url,
						type: getMediaType(mediaType!),
						uploadedBy: { connect: { id: user!.id } }
					}))
				}
			}
		});

		await pubsub.publish(channelId, message);

		return !!message;
	}
}
