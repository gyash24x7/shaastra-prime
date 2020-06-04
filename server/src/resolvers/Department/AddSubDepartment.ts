import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { GraphQLContext } from "../../utils";

@Resolver()
export class AddSubDepartmentResolver {
	@Authorized(["CORE"])
	@Mutation(() => Boolean)
	async addSubDepartment(
		@Arg("subDept") subDept: string,
		@Ctx() { prisma, user }: GraphQLContext
	) {
		let dept = await prisma.department.update({
			where: { id: user?.department.id },
			data: {
				subDepartments: { set: [...user!.department.subDepartments, subDept] }
			}
		});

		return !!dept;
	}
}
