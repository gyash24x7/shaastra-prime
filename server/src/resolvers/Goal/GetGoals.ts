import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { Goal } from "../../models/Goal";
import { GraphQLContext } from "../../utils";

@Resolver()
export class GetGoalsResolver {
	@Authorized()
	@Query(() => [Goal])
	async getGoals(@Ctx() { user }: GraphQLContext) {
		const { goals } = await user.department;
		return goals;
	}
}
