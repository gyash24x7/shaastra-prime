import { Field, InputType } from "type-graphql";

@InputType("AttachMediaToTaskInput")
export class AttachMediaToTaskInput {
	@Field() taskId: string;
	@Field(() => [String]) urls: string[];
}
