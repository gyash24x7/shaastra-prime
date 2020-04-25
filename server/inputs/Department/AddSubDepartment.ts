import { Field, InputType } from "type-graphql";

@InputType()
export class AddSubDepartmentInput {
	@Field()
	id: string;

	@Field()
	subDept: string;
}
