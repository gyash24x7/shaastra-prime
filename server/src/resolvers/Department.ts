import graphqlFields from "graphql-fields";
import {
	Arg,
	Authorized,
	Ctx,
	Info,
	Mutation,
	Query,
	Resolver
} from "type-graphql";
import { Department } from "../entities/Department";
import { User } from "../entities/User";
import { AssignFinManagerInput, GrantAccessInput } from "../inputs/Department";
import { GraphQLContext } from "../utils";
import getSelectionAndRelation from "../utils/getSelectionAndRelation";

@Resolver()
export class DepartmentResolver {
	@Authorized(["CORE"])
	@Mutation(() => Boolean)
	async addSubDepartment(
		@Arg("subDept") subDept: string,
		@Ctx() { user }: GraphQLContext
	) {
		let dept = await Department.findOneOrFail(user.departmentId, {
			select: ["subDepartments", "id"]
		});
		if (dept.subDepartments) dept.subDepartments.push(subDept);
		else dept.subDepartments = [subDept];
		dept = await Department.save(dept);

		return !!dept;
	}

	@Authorized("CORE")
	@Mutation(() => Boolean)
	async assignFinManager(
		@Arg("data") { userId, deptId }: AssignFinManagerInput
	) {
		const { affected } = await Department.update(deptId, {
			finManagerId: userId
		});
		return affected === 1;
	}

	@Mutation(() => Boolean)
	async createDepartment(@Arg("name") name: string) {
		const dept = await Department.create({ name }).save();
		return !!dept;
	}

	@Query(() => [Department])
	async getDepartments(@Info() info: any) {
		const { select, relations } = getSelectionAndRelation(
			graphqlFields(info),
			Department
		);
		const depts = await Department.find({ select, relations });
		return depts.filter(({ name }) => name !== "ADMIN");
	}

	@Authorized()
	@Query(() => [User])
	async getDeptMembers(@Arg("deptId") deptId: string, @Info() info: any) {
		const { select, relations } = getSelectionAndRelation(
			graphqlFields(info),
			User
		);
		const members = await User.find({
			where: { departmentId: deptId },
			relations,
			select
		});
		return members;
	}

	@Authorized("CORE")
	@Mutation(() => Boolean)
	async grantAccess(@Arg("data") { userId, role }: GrantAccessInput) {
		const { affected } = await User.update(userId, { role });
		return affected === 1;
	}
}
