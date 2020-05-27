import { Ctx, FieldResolver, Resolver, Root } from "type-graphql";
import { Task } from "../../models/Task";
import { GraphQLContext } from "../../utils";

@Resolver(Task)
export class TaskFieldResolvers {
	@FieldResolver()
	createdBy(@Root() { id }: Task, @Ctx() { prisma }: GraphQLContext) {
		return prisma.task.findOne({ where: { id } }).createdBy();
	}

	@FieldResolver()
	byDept(@Root() { id }: Task, @Ctx() { prisma }: GraphQLContext) {
		return prisma.task.findOne({ where: { id } }).byDept();
	}

	@FieldResolver()
	forDept(@Root() { id }: Task, @Ctx() { prisma }: GraphQLContext) {
		return prisma.task.findOne({ where: { id } }).forDept();
	}

	@FieldResolver()
	media(@Root() { id }: Task, @Ctx() { prisma }: GraphQLContext) {
		return prisma.task.findOne({ where: { id } }).media();
	}

	@FieldResolver()
	activity(@Root() { id }: Task, @Ctx() { prisma }: GraphQLContext) {
		return prisma.task.findOne({ where: { id } }).activity();
	}

	@FieldResolver()
	assignedTo(@Root() { id }: Task, @Ctx() { prisma }: GraphQLContext) {
		return prisma.task.findOne({ where: { id } }).assignedTo();
	}

	@FieldResolver()
	channels(@Root() { id }: Task, @Ctx() { prisma }: GraphQLContext) {
		return prisma.task.findOne({ where: { id } }).channels();
	}
}
