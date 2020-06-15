import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CreateUpdateInput } from "../inputs/Update";
import { Update } from "../models/Update";
import { GraphQLContext } from "../utils";

@Resolver()
export class UpdateResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async createUpdate(
		@Arg("data") { brief, subject, content }: CreateUpdateInput,
		@Ctx() { user }: GraphQLContext
	) {
		const update = await Update.create({
			brief,
			subject,
			content,
			postedById: user.id,
			byDeptId: user.departmentId
		}).save();

		return !!update;
	}

	@Authorized()
	@Query(() => [Update])
	async getUpdates() {
		const updates = await Update.find({ order: { id: "DESC" } });
		return updates;
	}
}
