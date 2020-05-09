import { Field, InputType } from "type-graphql";

@InputType()
export class AttachMediaToTaskInput {
	@Field() taskId: string;
	@Field(() => [String]) urls: string[];
}
