import { FieldResolver, Resolver, Root } from "type-graphql";
import { Goal } from "../../models/Goal";
import { prisma } from "../../prisma";

@Resolver(Goal)
export class GoalFieldResolvers {
	@FieldResolver()
	milestones(@Root() { id }: Goal) {
		return prisma.goal.findOne({ where: { id } }).milestones();
	}
}
