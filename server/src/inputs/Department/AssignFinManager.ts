import { Field, InputType } from "type-graphql";

@InputType("AssignFinManagerInput")
export class AssignFinManagerInput {
	@Field() userId: string;
	@Field() deptId: string;
}
