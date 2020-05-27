import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { AddSubDepartmentInput } from "../../inputs/Department/AddSubDepartment";
import { GraphQLContext } from "../../utils";

@Resolver()
export class AddSubDepartmentResolver {
	@Authorized(["CORE"])
	@Mutation(() => Boolean)
	async addSubDepartment(
		@Arg("data") { subDeptName, deptId }: AddSubDepartmentInput,
		@Ctx() { prisma }: GraphQLContext
	) {
		let dept = await prisma.department.update({
			where: { id: deptId },
			data: { subDepartments: { set: subDeptName } }
		});

		return !!dept;
	}
}
