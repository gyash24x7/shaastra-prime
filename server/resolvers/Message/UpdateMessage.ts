import { MessageUpdateInput } from "@prisma/client";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { UpdateMessageInput } from "../../inputs/Message/UpdateMessage";
import { prisma } from "../../prisma";
import { GraphQLContext } from "../../utils";

@Resolver()
export class UpdateMessageResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async updateMessage(
		@Arg("data") { messageId, starred, like }: UpdateMessageInput,
		@Ctx() { user }: GraphQLContext
	) {
		const data: MessageUpdateInput = {
			starred,
			likedBy:
				typeof like !== undefined
					? like
						? { connect: { id: user!.id } }
						: { disconnect: { id: user!.id } }
					: undefined
		};

		const message = await prisma.message.update({
			where: { id: messageId },
			data
		});

		return !!message;
	}
}
