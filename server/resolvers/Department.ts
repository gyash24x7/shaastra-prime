import {
	Resolver,
	Mutation,
	Arg,
	Query,
	FieldResolver,
	Root
} from "type-graphql";
import { Department } from "../models/Department";
import { User } from "../models/User";
import { AddSubDepartmentInput } from "../inputs/Department/AddSubDepartment";

@Resolver(Department)
export class DepartmentResolver {
	@Mutation(() => Department)
	async createDepartment(@Arg("name") name: string) {
		const department = await Department.create({ name }).save();
		return department;
	}

	@Mutation(() => Department)
	async addSubDepartment(@Arg("data") { id, subDept }: AddSubDepartmentInput) {
		const department = await Department.findOne({ where: { id } });
		if (!department) throw new Error("Department Not Found!");
		department.subDepartments = department.subDepartments.concat(subDept);
		return department.save();
	}

	@Query(() => [Department])
	async getDepartments() {
		return Department.find();
	}

	@FieldResolver(() => [User])
	async members(@Root() { id }: Department) {
		return User.find({ where: { departmentId: id } });
	}
}
