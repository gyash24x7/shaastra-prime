import { Query, Resolver } from "type-graphql";
import { Department } from "../../models/Department";

@Resolver()
export class GetDepartmentResolver {
	@Query(() => [Department])
	async getDepartments() {
		const depts = await Department.find();
		return depts.filter(({ name }) => name !== "ADMIN");
	}
}
