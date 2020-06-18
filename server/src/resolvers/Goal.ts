import {
	Arg,
	Authorized,
	Ctx,
	Info,
	Mutation,
	Query,
	Resolver
} from "type-graphql";
import { Goal } from "../entities/Goal";
import { Milestone } from "../entities/Milestone";
import { CreateGoalInput } from "../inputs/Goal";
import { GraphQLContext, MilestoneStatus } from "../utils";
import getSelectAndRelation from "../utils/getSelectAndRelation";

@Resolver()
export class GoalResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async completeMilestone(@Arg("milestoneId") milestoneId: string) {
		const { affected } = await Milestone.update(milestoneId, {
			status: MilestoneStatus.ACHIEVED
		});
		return affected === 1;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async createGoal(
		@Arg("data") { milestoneTitles, ...rest }: CreateGoalInput,
		@Ctx() { user: { departmentId } }: GraphQLContext
	) {
		const goal = await Goal.create({ ...rest, deptId: departmentId }).save();
		await Promise.all(
			milestoneTitles.map((title) =>
				Milestone.create({ title, goalId: goal.id }).save()
			)
		);
		return !!goal;
	}

	@Authorized()
	@Query(() => [Goal])
	async getGoals(@Ctx() { user }: GraphQLContext, @Info() info: any) {
		const { select, relations } = getSelectAndRelation(info, Goal);
		return Goal.find({
			where: { deptId: user.departmentId },
			select,
			relations
		});
	}
}
