import { Field, InputType, Int } from "type-graphql";

@InputType()
export class CreateChannelInput {
	@Field()
	name: string;

	@Field()
	description: string;

	@Field(() => [Int])
	members: number[];
}
