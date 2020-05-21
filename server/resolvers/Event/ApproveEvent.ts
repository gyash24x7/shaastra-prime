import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { prisma } from "../../prisma";

@Resolver()
export class ApproveEventResolver {
	@Authorized("CORE", "HEAD")
	@Mutation(() => Boolean)
	async approveEvent(@Arg("id") eventId: string) {
		const event = await prisma.event.update({
			where: { id: eventId },
			data: { approved: true }
		});

		return event.approved;
	}
}
