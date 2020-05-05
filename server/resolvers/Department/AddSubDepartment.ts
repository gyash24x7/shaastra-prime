import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { AddSubDepartmentInput } from "../../inputs/Department/AddSubDepartment";
import { prisma } from "../../prisma";

@Resolver()
export class AddSubDepartmentResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async addsubDepartment(
		@Arg("data") { subDeptName, deptId }: AddSubDepartmentInput
	) {
		let dept = await prisma.department.update({
			where: { id: deptId },
			data: { subDepartments: { set: subDeptName } }
		});

		return !!dept;
	}
}
