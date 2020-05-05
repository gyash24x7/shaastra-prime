import { FieldResolver, Resolver, Root } from "type-graphql";
import { Task } from "../../models/Task";
import { prisma } from "../../prisma";

@Resolver(Task)
export class TaskFieldResolvers {
	@FieldResolver()
	createdBy(@Root() { id }: Task) {
		return prisma.task.findOne({ where: { id } }).createdBy();
	}

	@FieldResolver()
	byDept(@Root() { id }: Task) {
		return prisma.task.findOne({ where: { id } }).byDept();
	}

	@FieldResolver()
	forDept(@Root() { id }: Task) {
		return prisma.task.findOne({ where: { id } }).forDept();
	}

	@FieldResolver()
	media(@Root() { id }: Task) {
		return prisma.task.findOne({ where: { id } }).media();
	}

	@FieldResolver()
	activity(@Root() { id }: Task) {
		return prisma.task.findOne({ where: { id } }).activity();
	}

	@FieldResolver()
	assignedTo(@Root() { id }: Task) {
		return prisma.task.findOne({ where: { id } }).assignedTo();
	}
}
