import { Query, Resolver } from "type-graphql";
import { Department } from "../../models/Department";

@Resolver()
export class GetDepartmentResolver {
	@Query(() => [Department])
	async getDepartments() {
		const dept = await Department.find();
		return dept.filter(({ name }) => name === "ADMIN");
	}
}
