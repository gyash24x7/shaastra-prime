import { FieldResolver, Resolver, Root } from "type-graphql";
import { TaskActivity } from "../../models/TaskActivity";
import { prisma } from "../../prisma";

@Resolver(TaskActivity)
export class TaskActivityFieldResolvers {
	@FieldResolver()
	task(@Root() { id }: TaskActivity) {
		return prisma.taskActivity.findOne({ where: { id } }).task();
	}
}
