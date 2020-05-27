import { Field, InputType } from "type-graphql";

@InputType("AddSubDepartmentInput")
export class AddSubDepartmentInput {
	@Field() deptId: string;
	@Field() subDeptName: string;
}
