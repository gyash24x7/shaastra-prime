import { Field, InputType } from "type-graphql";

@InputType()
export class CreateChannelInput {
	@Field()
	name: string;

	@Field()
	description: string;

	@Field(() => [String])
	members: string[];
}
