import { Arg, Authorized, Query, Resolver } from "type-graphql";
import { User } from "../../models/User";
import { prisma } from "../../prisma";

@Resolver()
export class GetDeptMembersResolver {
	@Authorized()
	@Query(() => [User])
	async getDeptMembers(@Arg("deptId") deptId: string) {
		return prisma.department.findOne({ where: { id: deptId } }).members();
	}
}
