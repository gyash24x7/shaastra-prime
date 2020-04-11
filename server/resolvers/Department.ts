import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";

import { AddSubDepartmentInput } from "../inputs/Department/AddSubDepartment";
import { Department } from "../models/Department";
import { User } from "../models/User";
import { prisma } from "../prisma";

@Resolver(Department)
export class DepartmentResolver {
	@Mutation(() => Department)
	async createDepartment(@Arg("name") name: string) {
		return prisma.department.create({ data: { name } });
	}

	@Mutation(() => Boolean)
	async addSubDepartment(@Arg("data") { id, subDept }: AddSubDepartmentInput) {
		let dept = await prisma.department.findOne({ where: { id } });
		if (!dept) return false;
		dept = await prisma.department.update({
			where: { id },
			data: { subDepartments: { set: dept.subDepartments.concat(subDept) } }
		});
		return !!dept;
	}

	@Query(() => [Department])
	async getDepartments() {
		return prisma.department.findMany();
	}

	@FieldResolver(() => [User])
	async members(@Root() { id }: Department) {
		return prisma.department.findOne({ where: { id } }).members();
	}
}
