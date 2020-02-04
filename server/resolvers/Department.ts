import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Department } from "../models/Department";
import { CreateDepartmentInput } from "../inputs/Department/CreateDepartment";

@Resolver()
export class DepartmentResolver {
	@Query(() => [Department])
	getDepartments() {
		return Department.find();
	}

	@Mutation(() => Department)
	async createDepartment(@Arg("data") data: CreateDepartmentInput) {
		const department = Department.create(data);
		await department.save();
		return department;
	}
}
