import { Field, InputType } from "type-graphql";

@InputType()
export class AssignFinManagerInput {
	@Field() userId: string;
	@Field() deptId: string;
}
