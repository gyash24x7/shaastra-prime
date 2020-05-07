import { Field, InputType } from "type-graphql";

@InputType()
export class CreateTaskInput {
	@Field() brief: string;
	@Field() details: string;
	@Field() forDeptId: string;
	@Field() deadline: string;
}
