import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { CreateGoalInput } from "../../inputs/Goal/CreateGoal";
import { Goal } from "../../models/Goal";
import { Milestone } from "../../models/Milestone";
import { GraphQLContext } from "../../utils";

@Resolver()
export class CreateGoalResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async createGoal(
		@Arg("data") { title, milestoneTitles, description, type }: CreateGoalInput,
		@Ctx() { user }: GraphQLContext
	) {
		const milestones = Milestone.create(
			milestoneTitles.map((title) => ({ title }))
		);

		const goal = await Goal.create({
			title,
			type,
			description,
			dept: user.department,
			milestones
		}).save();

		return !!goal;
	}
}
