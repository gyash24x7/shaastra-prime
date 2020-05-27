import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { GraphQLContext } from "../../utils";

@Resolver()
export class ApproveEventResolver {
	@Authorized("CORE", "HEAD")
	@Mutation(() => Boolean)
	async approveEvent(
		@Arg("id") eventId: string,
		@Ctx() { prisma }: GraphQLContext
	) {
		const event = await prisma.event.update({
			where: { id: eventId },
			data: { approved: true }
		});

		return event.approved;
	}
}
