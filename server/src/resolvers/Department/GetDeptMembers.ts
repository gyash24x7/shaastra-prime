import { Arg, Authorized, Query, Resolver } from "type-graphql";
import { Department } from "../../models/Department";
import { User } from "../../models/User";

@Resolver()
export class GetDeptMembersResolver {
	@Authorized()
	@Query(() => [User])
	async getDeptMembers(@Arg("deptId") deptId: string) {
		const dept = await Department.findOne(deptId);
		if (!dept) throw new Error("Department not found!");

		return dept?.members;
	}
}
