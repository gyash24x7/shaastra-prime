import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { Update } from "../../models/Update";
import { GraphQLContext } from "../../utils";

@Resolver()
export class GetUpdatesResolver {
	@Authorized()
	@Query(() => [Update])
	async getUpdates(@Ctx() { prisma }: GraphQLContext) {
		const updates = await prisma.update.findMany({
			orderBy: { createdAt: "desc" }
		});
		return new Promise((resolve) => setTimeout(() => resolve(updates), 1000));
	}
}
