import { Field, InputType } from "type-graphql";

@InputType()
export class CreateDepartmentInput {
	@Field(() => String)
	name: string;
}
