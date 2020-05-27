import { Field, InputType } from "type-graphql";

@InputType("CreateTaskInput")
export class CreateTaskInput {
	@Field() brief: string;
	@Field() details: string;
	@Field() forDeptId: string;
	@Field() deadline: string;
	@Field(() => [String]) channelIds: string[];
}
