import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CreateGoalInput } from "../inputs/Goal";
import { Goal } from "../models/Goal";
import { Milestone } from "../models/Milestone";
import { GraphQLContext, MilestoneStatus } from "../utils";

@Resolver()
export class GoalResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async completeMilestone(@Arg("milestoneId") milestoneId: string) {
		const { affected } = await Milestone.update(milestoneId, {
			status: MilestoneStatus.ACHIEVED
		});

		return !!affected;
	}

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

	@Authorized()
	@Query(() => [Goal])
	async getGoals(@Ctx() { user }: GraphQLContext) {
		const { goals } = await user.department;
		return goals;
	}
}
