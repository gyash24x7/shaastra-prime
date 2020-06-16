import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Department } from "../entities/Department";
import { User } from "../entities/User";
import { AssignFinManagerInput, GrantAccessInput } from "../inputs/Department";
import { GraphQLContext } from "../utils";

@Resolver()
export class DepartmentResolver {
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

	@Authorized("CORE")
	@Mutation(() => Boolean)
	async assignFinManager(
		@Arg("data") { userId, deptId }: AssignFinManagerInput
	) {
		const { affected } = await Department.update(deptId, {
			finManager: User.findOne(userId)
		});

		return !!affected;
	}

	@Mutation(() => Boolean)
	async createDepartment(@Arg("name") name: string) {
		const dept = await Department.create({ name }).save();
		return !!dept;
	}

	@Authorized("CORE")
	@Mutation(() => Boolean)
	async deleteMember(@Arg("userId") userId: string) {
		const { affected } = await User.delete(userId);
		return !!affected;
	}

	@Query(() => [Department])
	async getDepartments() {
		const depts = await Department.find();
		return depts.filter(({ name }) => name !== "ADMIN");
	}

	@Authorized()
	@Query(() => [User])
	async getDeptMembers(@Arg("deptId") deptId: string) {
		const dept = await Department.findOne(deptId);
		if (!dept) throw new Error("Department not found!");

		return dept?.members;
	}

	@Authorized("CORE")
	@Mutation(() => Boolean)
	async grantAccess(@Arg("data") { userId, role }: GrantAccessInput) {
		const { affected } = await User.update(userId, { role });
		return !!affected;
	}
}
