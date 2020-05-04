import { Arg, Mutation, Resolver } from "type-graphql";
import { Department } from "../../models/Department";
import { prisma } from "../../prisma";

@Resolver()
export class CreateDepartmentResolver {
	@Mutation(() => Department)
	async createDepartment(@Arg("name") name: string) {
		return prisma.department.create({ data: { name } });
	}
}
