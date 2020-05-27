import { Ctx, FieldResolver, Resolver, Root } from "type-graphql";
import { Department } from "../../models/Department";
import { Invoice } from "../../models/Invoice";
import { GraphQLContext } from "../../utils";
import User from "../User";

@Resolver(Department)
export class DepartmentFieldResolvers {
	@FieldResolver(() => [User])
	async members(@Root() { id }: Department, @Ctx() { prisma }: GraphQLContext) {
		return prisma.department.findOne({ where: { id } }).members();
	}

	@FieldResolver(() => [User])
	async updates(@Root() { id }: Department, @Ctx() { prisma }: GraphQLContext) {
		return prisma.department.findOne({ where: { id } }).updates();
	}

	@FieldResolver(() => [User])
	async tasksCreated(
		@Root() { id }: Department,
		@Ctx() { prisma }: GraphQLContext
	) {
		return prisma.department.findOne({ where: { id } }).tasksCreated();
	}

	@FieldResolver(() => [User])
	async tasksAssigned(
		@Root() { id }: Department,
		@Ctx() { prisma }: GraphQLContext
	) {
		return prisma.department.findOne({ where: { id } }).tasksAssigned();
	}

	@FieldResolver(() => [Invoice])
	async invoicesSubmitted(
		@Root() { id }: Department,
		@Ctx() { prisma }: GraphQLContext
	) {
		return prisma.department.findOne({ where: { id } }).invoicesSubmitted();
	}
}
