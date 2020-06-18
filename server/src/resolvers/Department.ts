import {
	Arg,
	Authorized,
	Ctx,
	FieldResolver,
	Info,
	Mutation,
	Query,
	Resolver,
	Root
} from "type-graphql";
import { Department } from "../entities/Department";
import { Task } from "../entities/Task";
import { User } from "../entities/User";
import { AssignFinManagerInput, GrantAccessInput } from "../inputs/Department";
import { GraphQLContext } from "../utils";
import getSelectAndRelation from "../utils/getSelectAndRelation";

@Resolver(Department)
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
		await Department.save(dept);
		return !!dept;
	}

	@Authorized("CORE")
	@Mutation(() => Boolean)
	async assignFinManager(
		@Arg("data") { finManagerId, deptId }: AssignFinManagerInput
	) {
		const { affected } = await Department.update(deptId, { finManagerId });
		return affected === 1;
	}

	@Mutation(() => Boolean)
	async createDepartment(@Arg("name") name: string) {
		const dept = await Department.create({ name }).save();
		return !!dept;
	}

	@Query(() => [Department])
	async getDepartments(@Info() info: any) {
		const { select, relations } = getSelectAndRelation(info, Department);
		const depts = await Department.find({ select, relations });
		return depts.filter(({ name }) => name !== "ADMIN");
	}

	@Authorized()
	@Query(() => [User])
	async getDeptMembers(@Arg("deptId") deptId: string, @Info() info: any) {
		const { select, relations } = getSelectAndRelation(info, User);
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

	@FieldResolver()
	async members(@Root() { id, members }: Department) {
		if (members) return members;
		return User.find({ where: { departmentId: id } });
	}

	@FieldResolver()
	async tasksAssigned(@Root() { id, tasksAssigned }: Department) {
		if (tasksAssigned) return tasksAssigned;
		return Task.find({ where: { forDeptId: id } });
	}

	@FieldResolver()
	async tasksCreated(@Root() { id, tasksCreated }: Department) {
		if (tasksCreated) return tasksCreated;
		return Task.find({ where: { byDeptId: id } });
	}

	@FieldResolver()
	async finManager(@Root() { finManagerId, finManager }: Department) {
		if (finManager) return finManager;
		return User.findOne(finManagerId);
	}
}
