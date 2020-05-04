import { FieldResolver, Resolver, Root } from "type-graphql";
import { Department } from "../../models/Department";
import { Invoice } from "../../models/Invoice";
import { prisma } from "../../prisma";
import User from "../User";

@Resolver(Department)
export class DepartmentFieldResolvers {
	@FieldResolver(() => [User])
	async members(@Root() { id }: Department) {
		return prisma.department.findOne({ where: { id } }).members();
	}

	@FieldResolver(() => [User])
	async updates(@Root() { id }: Department) {
		return prisma.department.findOne({ where: { id } }).updates();
	}

	@FieldResolver(() => [User])
	async goals(@Root() { id }: Department) {
		return prisma.department.findOne({ where: { id } }).goals();
	}

	@FieldResolver(() => [User])
	async tasksCreated(@Root() { id }: Department) {
		return prisma.department.findOne({ where: { id } }).tasksCreated();
	}

	@FieldResolver(() => [User])
	async tasksAssigned(@Root() { id }: Department) {
		return prisma.department.findOne({ where: { id } }).tasksAssigned();
	}

	@FieldResolver(() => [User])
	async subDepartments(@Root() { id }: Department) {
		return prisma.department.findOne({ where: { id } }).subDepartments();
	}

	@FieldResolver(() => [Invoice])
	async invoicesSubmitted(@Root() { id }: Department) {
		return prisma.department.findOne({ where: { id } }).invoicesSubmitted();
	}
}
