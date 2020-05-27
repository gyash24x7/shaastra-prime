import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { GraphQLContext } from "../../utils";

@Resolver()
export class DeleteEventResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async deleteEvent(@Arg("id") id: string, @Ctx() { prisma }: GraphQLContext) {
		const event = await prisma.event.delete({ where: { id } });
		return !!event;
	}
}
