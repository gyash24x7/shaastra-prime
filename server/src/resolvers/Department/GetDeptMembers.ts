import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";
import { User } from "../../models/User";
import { GraphQLContext } from "../../utils";

@Resolver()
export class GetDeptMembersResolver {
	@Authorized()
	@Query(() => [User])
	async getDeptMembers(
		@Arg("deptId") deptId: string,
		@Ctx() { prisma }: GraphQLContext
	) {
		return prisma.department.findOne({ where: { id: deptId } }).members();
	}
}
