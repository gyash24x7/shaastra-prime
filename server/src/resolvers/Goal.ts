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
import { InjectRepository } from "typeorm-typedi-extensions";
import { Goal } from "../entities/Goal";
import { CreateGoalInput } from "../inputs/Goal";
import { GoalRepository } from "../repositories/Goal";
import { MilestoneRepository } from "../repositories/Milestone";
import { GraphQLContext, MilestoneStatus } from "../utils";
import getSelectionAndRelation from "../utils/getSelectionAndRelation";

@Resolver()
export class GoalResolver {
	@InjectRepository()
	private readonly goalRepo: GoalRepository;

	@InjectRepository()
	private readonly milestoneRepo: MilestoneRepository;

	@Authorized()
	@Mutation(() => Boolean)
	async completeMilestone(@Arg("milestoneId") milestoneId: string) {
		const milestone = await this.milestoneRepo.save({
			status: MilestoneStatus.ACHIEVED,
			id: milestoneId
		});

		return !!milestone;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async createGoal(
		@Arg("data") { milestoneTitles, ...rest }: CreateGoalInput,
		@Ctx() { user }: GraphQLContext
	) {
		const goal = await this.goalRepo.save({
			...rest,
			deptId: user.departmentId,
			milestones: this.milestoneRepo.create(
				milestoneTitles.map((title) => ({ title }))
			)
		});

		return !!goal;
	}

	@Authorized()
	@Query(() => [Goal])
	async getGoals(@Ctx() { user }: GraphQLContext, @Info() info: any) {
		const { select, relations } = getSelectionAndRelation(
			graphqlFields(info),
			this.goalRepo
		);

		const goals = this.goalRepo.find({
			where: { deptId: user.departmentId },
			select,
			relations
		});

		return goals;
	}
}
