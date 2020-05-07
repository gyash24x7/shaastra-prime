import { Authorized, Query, Resolver } from "type-graphql";
import { Update } from "../../models/Update";
import { prisma } from "../../prisma";

@Resolver()
export class GetUpdatesResolver {
	@Authorized()
	@Query(() => [Update])
	async getUpdates() {
		const updates = await prisma.update.findMany({
			orderBy: { createdAt: "desc" }
		});
		return updates;
	}
}
