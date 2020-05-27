import { Ctx, FieldResolver, Resolver, Root } from "type-graphql";
import { Goal } from "../../models/Goal";
import { GraphQLContext } from "../../utils";
@Resolver(Goal)
export class GoalFieldResolvers {
	@FieldResolver()
	milestones(@Root() { id }: Goal, @Ctx() { prisma }: GraphQLContext) {
		return prisma.goal.findOne({ where: { id } }).milestones();
	}
}
