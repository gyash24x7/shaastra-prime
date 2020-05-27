import { Field, InputType } from "type-graphql";

@InputType("AssignTaskInput")
export class AssignTaskInput {
	@Field() taskId: string;
	@Field(() => [String]) assignedTo: string[];
}
