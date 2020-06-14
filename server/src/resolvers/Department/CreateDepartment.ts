import { Arg, Mutation, Resolver } from "type-graphql";
import { Department } from "../../models/Department";

@Resolver()
export class CreateDepartmentResolver {
	@Mutation(() => Boolean)
	async createDepartment(@Arg("name") name: string) {
		const dept = await Department.create({ name }).save();
		return !!dept;
	}
}
