import { Field, InputType } from "type-graphql";

@InputType()
export class AddSubDepartmentInput {
	@Field() deptId: string;
	@Field() subDeptName: string;
}
