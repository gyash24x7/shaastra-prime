import { Field, InputType } from "type-graphql";

@InputType()
export class AssignTaskInput {
	@Field() taskId: string;
	@Field(() => [String]) assignedTo: string[];
}
