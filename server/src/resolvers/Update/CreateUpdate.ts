import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { CreateUpdateInput } from "../../inputs/Update/CreateUpdate";
import { Update } from "../../models/Update";
import { GraphQLContext } from "../../utils";

@Resolver()
export class CreateUpdateResolver {
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
			postedBy: Promise.resolve(user),
			byDept: user.department
		}).save();

		return !!update;
	}
}
