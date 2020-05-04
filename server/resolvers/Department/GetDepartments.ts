import { Query, Resolver } from "type-graphql";
import { Department } from "../../models/Department";
import { prisma } from "../../prisma";

@Resolver()
export class GetDepartmentResolver {
	@Query(() => [Department])
	async getDepartments() {
		return prisma.department.findMany();
	}
}
