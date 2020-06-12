import { Authorized, Query, Resolver } from "type-graphql";
import { Update } from "../../models/Update";

@Resolver()
export class GetUpdatesResolver {
	@Authorized()
	@Query(() => [Update])
	async getUpdates() {
		const updates = await Update.find({ order: { id: "DESC" } });
		return updates;
	}
}
