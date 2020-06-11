import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { Department } from "../../models/Department";
import { GraphQLContext } from "../../utils";

@Resolver()
export class AddSubDepartmentResolver {
	@Authorized(["CORE"])
	@Mutation(() => Boolean)
	async addSubDepartment(
		@Arg("subDept") subDept: string,
		@Ctx() { user }: GraphQLContext
	) {
		let dept = await user.department;
		const { affected } = await Department.update(dept.id, {
			subDepartments: dept.subDepartments.concat([subDept])
		});

		return !!affected;
	}
}
