import { Field, InputType } from "type-graphql";

@InputType("CreateChannelInput")
export class CreateChannelInput {
	@Field() name: string;
	@Field() description: string;
	@Field(() => [String]) memberIds: string[];
}
