import graphqlFields from "graphql-fields";
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
import getSelectionAndRelation from "../utils/getSelectionAndRelation";

@Resolver()
export class GoalResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async completeMilestone(@Arg("milestoneId") milestoneId: string) {
		const milestone = await Milestone.update(milestoneId, {
			status: MilestoneStatus.ACHIEVED
		});

		return !!milestone;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async createGoal(
		@Arg("data") { milestoneTitles, ...rest }: CreateGoalInput,
		@Ctx() { user }: GraphQLContext
	) {
		const goal = await Goal.create({
			...rest,
			deptId: user.departmentId,
			milestones: Milestone.create(milestoneTitles.map((title) => ({ title })))
		}).save();

		return !!goal;
	}

	@Authorized()
	@Query(() => [Goal])
	async getGoals(@Ctx() { user }: GraphQLContext, @Info() info: any) {
		const { select, relations } = getSelectionAndRelation(
			graphqlFields(info),
			Goal
		);

		const goals = Goal.find({
			where: { deptId: user.departmentId },
			select,
			relations
		});

		return goals;
	}
}
