import { Field, InputType } from "type-graphql";

@InputType()
export class CreateSubDepartmentInput {
	@Field() name: string;
	@Field(() => [String]) members: string[];
}
