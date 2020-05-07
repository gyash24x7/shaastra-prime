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
		@Ctx() { req }: GraphQLContext
	) {
		const id = req.session!.userId;
		const data: MessageUpdateInput = {
			starred,
			likedBy:
				typeof like !== undefined
					? like
						? { connect: { id } }
						: { disconnect: { id } }
					: undefined
		};

		const message = await prisma.message.update({
			where: { id: messageId },
			data
		});

		return !!message;
	}
}
