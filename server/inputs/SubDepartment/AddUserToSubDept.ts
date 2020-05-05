import { Field, InputType } from "type-graphql";

@InputType()
export class AddUserToSubDeptInput {
	@Field() subDept: string;
	@Field(() => [String]) members: string[];
}
