import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { Department } from "../../models/Department";
import { GraphQLContext } from "../../utils";

@Resolver()
export class CreateDepartmentResolver {
	@Mutation(() => Department)
	async createDepartment(
		@Arg("name") name: string,
		@Ctx() { prisma }: GraphQLContext
	) {
		return prisma.department.create({ data: { name } });
	}
}
