import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { CreateGoalInput } from "../../inputs/Goal/CreateGoal";
import { prisma } from "../../prisma";
import { GraphQLContext } from "../../utils";

@Resolver()
export class CreateGoalResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async createGoal(
		@Arg("data") { title, milestoneTitles, description, type }: CreateGoalInput,
		@Ctx() { user }: GraphQLContext
	) {
		const goal = await prisma.goal.create({
			data: {
				title,
				type,
				description,
				dept: { connect: { id: user?.department.id } },
				milestones: { create: milestoneTitles.map((title) => ({ title })) }
			}
		});

		return !!goal;
	}
}
