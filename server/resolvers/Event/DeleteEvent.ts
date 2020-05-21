import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { prisma } from "../../prisma";

@Resolver()
export class DeleteEventResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async deleteEvent(@Arg("id") id: string) {
		const event = await prisma.event.delete({ where: { id } });
		return !!event;
	}
}
