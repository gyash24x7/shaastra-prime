import { InputType, Field, Int } from "type-graphql";

@InputType()
export class AddSubDepartmentInput {
	@Field(() => Int)
	id: number;

	@Field()
	subDept: string;
}
