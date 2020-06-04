import { Ctx, Query, Resolver } from "type-graphql";
import { Department } from "../../models/Department";
import { GraphQLContext } from "../../utils";

@Resolver()
export class GetDepartmentResolver {
	@Query(() => [Department])
	async getDepartments(@Ctx() { prisma }: GraphQLContext) {
		return prisma.department.findMany({ where: { name: { not: "ADMIN" } } });
	}
}
